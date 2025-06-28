type FollowUp = {
    message: string;
    options: string[];
    tone?: string;
    insight?: string;
};

type DiagnosisResult = {
    stage: string;
    potential: string;
    specificInsights: string;
    recommendations: string[];
};

type NextSteps = {
    message: string;
    options: string[];
    urgency?: string;
};

type Welcome = {
    type: "welcome";
    message: string;
    options: string[];
    personality: string;
};

type Qualification = {
    type: "qualification";
    message: string;
    options: string[];
    followUp: FollowUp;
};

type Marketplace = {
    type: "marketplace";
    message: string;
    options: string[];
    followUp: FollowUp;
};

type Products = {
    type: "products";
    message: string;
    options: string[];
    followUp: FollowUp;
};

type Diagnosis = {
    type: "diagnosis";
    message: string;
    options: string[];
    followUp: FollowUp;
};

export type Result = {
    type: "result";
    message: string;
    diagnosis: DiagnosisResult;
    nextSteps: NextSteps;
};

export type instrucoes =
    | Welcome
    | Qualification
    | Marketplace
    | Products
    | Diagnosis
    | Result;

export type instrucoesIndexadasType = {
    welcome: Welcome;
    qualification: Qualification;
    marketplace: Marketplace;
    products: Products;
    diagnosis: Diagnosis;
    result: Result;
};
