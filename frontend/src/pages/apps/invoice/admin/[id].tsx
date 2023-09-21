// ** Third Party Imports
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// ** Types
import { createClient } from "@supabase/supabase-js";
// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const InvoicePreview = () => {
  const [documents, setDocuments] = useState([]);
  const [documentsDetails, setDocumentsDetails] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const router = useRouter();
  const getDocuments = async () => {
    let uploads = [];
    const claimId = router.query;
    const { data, error } = await supabase.storage
      .from("document_bucket") // Replace with your bucket name
      .list(`public/${claimId.id}`);

    if (error) {
      console.error("Error fetching files:", error.message);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      const url = supabase.storage
        .from("document_bucket")
        .getPublicUrl(`public/${claimId.id}/${data[i].name}`);
      console.log(url);
      console.log(url.data.publicUrl);
      uploads.push(url.data.publicUrl);
    }
    console.log(uploads);
    setDocuments(uploads);
  };

  const getDocumentDetails = async () => {
    const claimId = router.query;
    const query = JSON.stringify({
      query: `query MyQuery {
        Document(where: {claim_id: {_eq: "${claimId.id}"}}) {
          type
          similarity_score
          id
          file_name
          created_at
          claim_id
          amount
          admin_decision
          flag
        }
      }
      `,
    });

    const response = await fetch(
      "https://capital-owl-54.hasura.app/v1/graphql",
      {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        method: "POST",
        body: query,
      }
    );

    const responseJson = await response.json();
    console.log(responseJson.data.Document);
    setDocumentsDetails(responseJson.data.Document);
  };
  useEffect(() => {
    getDocuments();
    getDocumentDetails();
  }, []);

  const giveDecision = async (documentsDetails, decision) => {
    console.log("Clicked");
    const { data, error } = await supabase
      .from("Claim")
      .update({ status: decision == 1 ? "Accepted" : "Rejected" })
      .eq("id", router.query)
      .select();

    console.log(data, error);
  };

  useEffect(() => {}, [documents]);
  useEffect(() => {}, [documentsDetails]);
  return (
    <>
      <h2 className="block text-sm font-medium text-gray-700 dark:text-white my-4">
        Supporting documents uploaded
      </h2>

      <div>
        {documents &&
          documentsDetails &&
          documents.map((document, i) => {
            return (
              <div
                style={{
                  width: "47%",
                  marginBottom: "20px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  display: "inline-block",
                }}
              >
                {document && documentsDetails[i] && (
                  <div>
                    <Card>
                      <object
                        width="100%"
                        height="400"
                        data={document}
                        type="application/pdf"
                        style={{ borderRadius: "5px" }}
                      >
                        {" "}
                      </object>
                      <CardContent
                        sx={{
                          background:
                            documentsDetails[i].flag == "red"
                              ? "#FFCCCB"
                              : documentsDetails[i].flag == "amber"
                              ? "#FFBF00"
                              : "",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CustomAvatar
                            skin="light"
                            variant="rounded"
                            sx={{ mr: 3, width: "3rem", height: "3.375rem" }}
                          >
                            <Box
                              sx={{
                                mt: 1.5,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 500,
                                  lineHeight: 1.29,
                                  color: "primary.main",
                                  letterSpacing: "0.47px",
                                }}
                              >
                                {
                                  months[
                                    documentsDetails[i].created_at.substring(
                                      5,
                                      7
                                    ) - 1
                                  ]
                                }
                              </Typography>
                              <Typography
                                variant="h6"
                                sx={{
                                  mt: -0.75,
                                  fontWeight: 600,
                                  color: "primary.main",
                                }}
                              >
                                {documentsDetails[i].created_at.substring(
                                  8,
                                  10
                                )}
                              </Typography>
                            </Box>
                          </CustomAvatar>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography sx={{ fontWeight: 600 }}>
                              {documentsDetails[i].file_name.substring(0, 20)}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ letterSpacing: "0.4px" }}
                            >
                              The similarity score of the document is{" "}
                              {documentsDetails[i].similarity_score}
                            </Typography>
                          </Box>
                        </Box>

                        {/* <Divider
                      sx={{
                        mb: (theme) => `${theme.spacing(4)} !important`,
                        mt: (theme) => `${theme.spacing(4.75)} !important`,
                      }}
                    /> */}

                        {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          "& svg": { fontSize: "1.75rem" },
                        }}
                      >
                        <Icon icon="mdi:star-outline" />
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          Interested
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          "& svg": { fontSize: "1.75rem" },
                        }}
                      >
                        <Icon icon="mdi:check-circle-outline" />
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          Joined
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          color: "primary.main",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          "& svg": { fontSize: "1.75rem" },
                        }}
                      >
                        <Icon icon="mdi:account-outline" />
                        <Typography
                          sx={{ fontSize: "0.875rem", color: "primary.main" }}
                        >
                          Invited
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          "& svg": { fontSize: "1.75rem" },
                        }}
                      >
                        <Icon icon="mdi:dots-horizontal" />
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          More
                        </Typography>
                      </Box>
                    </Box> */}

                        <Divider
                          sx={{
                            mt: (theme) => `${theme.spacing(2.75)} !important`,
                            mb: (theme) => `${theme.spacing(3.25)} !important`,
                          }}
                        />

                        {/* <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        "& svg": {
                          mr: 3,
                          mt: 1,
                          fontSize: "1.375rem",
                          color: "text.secondary",
                        },
                      }}
                    >
                      <Icon icon="mdi:clock-time-three-outline" />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          Tuesday, 24 january, 10:20 - 12:30
                        </Typography>
                        <Typography variant="caption">After 1 Week</Typography>
                      </Box>
                    </Box> */}

                        {documentsDetails[i].admin_decision === 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              "& svg": {
                                mr: 3,
                                mt: 1,
                                fontSize: "1.375rem",
                                color: "text.secondary",
                              },
                            }}
                          >
                            {/* <Icon icon="mdi:map-marker-outline" />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          The Rochard NYC
                        </Typography>
                        <Typography variant="caption">
                          1305 Lexington Ave, New York
                        </Typography>
                      </Box> */}
                            <div style={{ width: "100%", padding: "5px" }}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                onClick={() => {
                                  giveDecision(documentsDetails[i], 1);
                                }}
                                //   endIcon={<Icon icon="mdi:arrow-right" />}
                              >
                                Approve
                              </Button>
                            </div>
                            <div style={{ width: "100%", padding: "5px" }}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  giveDecision(documentsDetails[i], 2);
                                }}
                                //   endIcon={<Icon icon="mdi:arrow-right" />}
                              >
                                Reject
                              </Button>
                            </div>
                            <div style={{ width: "100%", padding: "5px" }}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                  giveDecision(documentsDetails[i], 3);
                                }}
                                //   endIcon={<Icon icon="mdi:arrow-right" />}
                              >
                                Suspicious
                              </Button>
                            </div>
                          </Box>
                        )}
                        {documentsDetails[i].admin_decision === 1 && (
                          <Box
                            sx={{
                              display: "flex",
                              "& svg": {
                                mr: 3,
                                mt: 1,
                                fontSize: "1.375rem",
                                color: "text.secondary",
                              },
                            }}
                          >
                            <div style={{ width: "100%", padding: "5px" }}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                //   endIcon={<Icon icon="mdi:arrow-right" />}
                              >
                                Approved
                              </Button>
                            </div>
                          </Box>
                        )}
                        {documentsDetails[i].admin_decision === 3 && (
                          <Box
                            sx={{
                              display: "flex",
                              "& svg": {
                                mr: 3,
                                mt: 1,
                                fontSize: "1.375rem",
                                color: "text.secondary",
                              },
                            }}
                          >
                            <div style={{ width: "100%", padding: "5px" }}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="warning"
                                //   endIcon={<Icon icon="mdi:arrow-right" />}
                              >
                                Warned
                              </Button>
                            </div>
                          </Box>
                        )}
                        {documentsDetails[i].admin_decision === 2 && (
                          <Box
                            sx={{
                              display: "flex",
                              "& svg": {
                                mr: 3,
                                mt: 1,
                                fontSize: "1.375rem",
                                color: "text.secondary",
                              },
                            }}
                          >
                            <div style={{ width: "100%", padding: "5px" }}>
                              <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                //   endIcon={<Icon icon="mdi:arrow-right" />}
                              >
                                Rejected
                              </Button>
                            </div>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default InvoicePreview;
