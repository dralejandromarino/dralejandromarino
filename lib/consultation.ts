export const consultationLimits = {
  name: 120,
  email: 254,
  summary: 4000,
} as const;

export type ConsultationFieldErrors = {
  name?: string;
  email?: string;
  summary?: string;
  consultationType?: string;
};

export type ConsultationState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: ConsultationFieldErrors;
};

export const initialConsultationState: ConsultationState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
