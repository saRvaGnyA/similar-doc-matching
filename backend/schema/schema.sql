CREATE TABLE "User"
(
    "id"            UUID                           NOT NULL,
    "created_at"    TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "name"          VARCHAR(255)                   NOT NULL,
    "age"           DATE                           NOT NULL,
    "gender"        VARCHAR(255)                   NOT NULL,
    "mobile_number" VARCHAR(255)                   NOT NULL
);
ALTER TABLE
    "User"
    ADD PRIMARY KEY ("id");
CREATE TABLE "Dependent"
(
    "id"         UUID                           NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "user_id"    UUID                           NOT NULL,
    "relation"   VARCHAR(255)                   NOT NULL,
    "gender"     VARCHAR(255)                   NOT NULL
);
ALTER TABLE
    "Dependent"
    ADD PRIMARY KEY ("id");
CREATE TABLE "Document"
(
    "id"               UUID                           NOT NULL,
    "created_at"       TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "claim_id"         UUID                           NOT NULL,
    "type"             VARCHAR(255)                   NOT NULL,
    "amount"           BIGINT                         NOT NULL,
    "similarity_score" DOUBLE PRECISION               NOT NULL
);
ALTER TABLE
    "Document"
    ADD PRIMARY KEY ("id");
CREATE TABLE "Claim"
(
    "id"           UUID                           NOT NULL,
    "created_at"   TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "user_id"      UUID                           NOT NULL,
    "name"         VARCHAR(255)                   NOT NULL,
    "injury_cause" VARCHAR(255)                   NOT NULL,
    "date"         DATE                           NOT NULL,
    "amount"       BIGINT                         NOT NULL,
    "status"       VARCHAR(255)                   NOT NULL
);
ALTER TABLE
    "Claim"
    ADD PRIMARY KEY ("id");
ALTER TABLE
    "Document"
    ADD CONSTRAINT "document_claim_id_foreign" FOREIGN KEY ("claim_id") REFERENCES "Claim" ("id");
ALTER TABLE
    "Claim"
    ADD CONSTRAINT "claim_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "User" ("id");
ALTER TABLE
    "Dependent"
    ADD CONSTRAINT "dependent_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "User" ("id");
ALTER TABLE "User"
    ALTER COLUMN id SET DATA TYPE UUID USING (extensions.uuid_generate_v4());
ALTER TABLE "Dependent"
    ALTER COLUMN id SET DATA TYPE UUID USING (extensions.uuid_generate_v4());
ALTER TABLE "Document"
    ALTER COLUMN id SET DATA TYPE UUID USING (extensions.uuid_generate_v4());
ALTER TABLE "Claim"
    ALTER COLUMN id SET DATA TYPE UUID USING (extensions.uuid_generate_v4());
ALTER TABLE "User"
    alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE "Dependent"
    alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE "Claim"
    alter column id set DEFAULT extensions.uuid_generate_v4();
ALTER TABLE "Dependent"
    alter column id set DEFAULT extensions.uuid_generate_v4();
