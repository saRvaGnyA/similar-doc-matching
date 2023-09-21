<h1 align="center">
  <a href="https://github.com/saRvaGnyA/similar-doc-matching">
    <img src="https://sdk.finance/wp-content/uploads/2021/07/001.png?x38932" alt="Doc Matching" width="350" height="250">
  </a>
  <br>
  Similar Document Template Matching Algorithm
</h1>
 
<div align="center">
   <strong>Doc Matching</strong> - A Similar Document Template Matching ML Model to detect fraudulent documents for insurance claims<br>
  Pre - Smart India Hackathon '23 VJTI - Team TechnoSrats <br>
</div>

<hr>

<details>
<summary>Table of Contents</summary>

- [Description](#description)
- [Links](#links)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [Usage](#usage)
- [Team Members](#team-members)

</details>

## 📝Description

<table>
  <tr>
    <td>
Fraud transactions and invoices are serious problems in the financial services and insurance industries, KPMG reported over a billion dollars in losses due to fraudulent transactions. Thousands of man hours are lost each year to tedious manual checking of invoices and documents to confirm their validity. Extraction of standard information common to most insurance related documents is also required, with the advent of advanced computer vision and object detection models the automation of these odious tasks has become possible
<br><br>
      The <i>key features</i> are:
      <ul>
<li> Detect and extract standardised fields of information from important documents such as - 
    <ul>
      <li> Invoice number </li>
      <li> Total amount </li>
      <li> Personal details of the claimant </li>
    </ul>
<li> Check for common markers of fake invoices such as
<ul>
      <li> Minor changes to details of the invoice like changing the colour of a logo, changing the date of issue, changing the name of the claimant etc.  </li>
      <li> Grammatical errors </li>
      <li> Changing positions of the tables or service provider details of the invoice </li>
    </ul>
  <li> Flag the fraudulent/suspicious documents with red and amber colours respectively on the Dashboard </li>
        <li> Detect and group patterns in existing and new Documents, present the related templates and patterns in a clustering graph chart visually </li>
      </ul>
    </td>
  </tr>
  </table>
  
- Problem Statement ID: SIH1441
- Problem Statement Title: Similar Document Template Matching Algorithm from Bajaj Finserv Health Ltd

### Flowcharts

![Modern Project Management Process Infographic Graph](https://github.com/saRvaGnyA/similar-doc-matching/assets/24823649/7d9e4670-0382-45c4-9432-61364593cb95)  
![Minimalist White Colorful Project Management Process Infographic Graph](https://github.com/saRvaGnyA/similar-doc-matching/assets/24823649/5aadcf41-8ff5-4d0e-ab41-fb08091f2f77)


## 🔗Links

### Assets

- [GitHub Repo](https://github.com/saRvaGnyA/similar-doc-matching)
- [Drive link for PPT](https://docs.google.com/presentation/d/1BdZr7hHd4X8RenVTC1hHSzQmLpTHUL2w-BDA8KbkFek/edit?usp=sharing)
- [Proposal](https://docs.google.com/document/d/1LnZ_EIVjMkTA8e2q9V1swQQJ4rpQ2-yKSTu4EeCkAhU/edit?usp=sharing)
- [Demo Video](https://youtu.be/Ulq-CRd5YeE)

### Backend (Hasura and Render)

- [Hasura GraphQL Server](https://capital-owl-54.hasura.app/v1/graphql)
- [Model Deployment Swagger Docs](https://sih-fraud-detection-api.onrender.com/docs)

## 🤖Tech-Stack

### Web Development

- NextJS
- Material UI

### Database

- PostgreSQL (using Supabase)

### APIs

- Hasura GraphQL API (over the Postgres DB)
- FastAPI (for the model)

### Machine Learning

- Tensorflow (for Deep-Learning based Bounding Box model)
- Scikit-Learn (for NLP-based Named Entity Recognition)

## 🛠Project Setup

### For the web-app

1. Clone the GitHub repo
   ```
   $ git clone https://github.com/saRvaGnyA/similar-doc-matching.git
   ```
2. Enter the `client` directory. Install all the required dependencies. Ensure that remove any globally-installed packages like the React CLI, Tailwind CLI, PostCSS CLI or ESLint are uninstalled before proceeding ahead
   ```
   $ cd client
   $ yarn add
   ```
3. Setup the `.env` file for storing the environment variables. A demo file for this is as follows:
   ```
   NEXT_PUBLIC_HASURA_ADMIN_SECRET = your hasura admin key
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your supabase anon key
   NEXT_PUBLIC_SUPABASE_URL = your supabase public url
   ```
4. If you are working on Visual Studio Code or WebStorm, it'd be convenient to install the extensions for [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

### For the model

1. Clone the GitHub repo
   ```
   $ git clone https://github.com/saRvaGnyA/similar-doc-matching.git
   ```
2. Create a virtual environment on the anaconda command prompt (Install [conda](https://docs.conda.io/en/latest/) if not installed) and then switch to that virtual environment. Lets say the name of the env is test.
   ```
   $ conda create -n test python=3.8 anaconda
   $ conda activate test
   ```
3. Look for requirments.txt and install the packages.
   ```
   $ pip install -r requirements.txt
   ```

### For the FastAPI

1. Look for the `main.py` and `utils.py` files and have them ready. (The packages for FastAPI would already be installed when you run command number 3 in the above section)

## 💻Usage

Once the required setup and installation is completed, you can start developing and running the project.

### For the web-app

1. Go to the `frontend` directory and run the `dev` script to activate the development server
   ```
   $ npm run dev
   ```
   Before pushing any commit, make sure to run the `lint` script and fix any linting errors
   ```
   $ npm run lint
   ```
   If you get an ESLint, Tailwind or PostCSS version conflict error, make a `.env` file in the `client` directory with the following contents:
   ```
   SKIP_PREFLIGHT_CHECK = true
   ```

### For the model and for the FastAPI

1. Locate to the `Model` directory. The models for the project are in `gesture_model.tflite` file.

2. Open the command prompt for anaconda and switch to the virtual environment that you created. (example: test)

   ```
   $ conda activate test
   ```

3. To initiate the server, type the following in the command prompt

   ```
   $ python main.py
   ```

## 👩‍💻Team Members

- [@Sarvagnya Purohit](https://github.com/saRvaGnyA)
- [@Smit Sekhadia](https://github.com/smitsekhadiaa)
- [@Harsh Nag](https://github.com/Jigsaw-23122002)
- [@Neel Shah](https://github.com/Neel-Shah-29)
- [@Ananya Bangera](https://github.com/ananya-bangera)
- [@Devansh Joshi](https://github.com/devdev29)
