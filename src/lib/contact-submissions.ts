import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/firebase";

export type ContactSubmission = {
  id: string;
  submittedAt?: string;
  createdAt?: unknown;
  accountEmail?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  details: string;
  message?: string;
  read: boolean;
  emailStatus: "pending" | "sent" | "failed";
};

export type NewContactSubmission = Omit<
  ContactSubmission,
  "id" | "submittedAt" | "createdAt" | "read" | "emailStatus"
>;

const CONTACT_REQUESTS_COLLECTION = "contactRequests";

function normalizeContactSubmission(id: string, data: Record<string, unknown>): ContactSubmission {
  const createdAt = data.createdAt as { toDate?: () => Date } | undefined;
  const submittedAt =
    typeof data.submittedAt === "string"
      ? data.submittedAt
      : createdAt?.toDate
        ? createdAt.toDate().toISOString()
        : new Date().toISOString();

  return {
    id,
    submittedAt,
    createdAt: data.createdAt,
    accountEmail: typeof data.accountEmail === "string" ? data.accountEmail : "",
    name: typeof data.name === "string" ? data.name : "",
    email: typeof data.email === "string" ? data.email : "",
    phone: typeof data.phone === "string" ? data.phone : "",
    company: typeof data.company === "string" ? data.company : "",
    service: typeof data.service === "string" ? data.service : "",
    budget: typeof data.budget === "string" ? data.budget : "",
    details:
      typeof data.details === "string"
        ? data.details
        : typeof data.message === "string"
          ? data.message
          : "",
    message: typeof data.message === "string" ? data.message : "",
    read: Boolean(data.read),
    emailStatus:
      data.emailStatus === "sent" || data.emailStatus === "failed" ? data.emailStatus : "pending",
  };
}

export async function addContactSubmission(submission: NewContactSubmission) {
  const docRef = await addDoc(collection(db, CONTACT_REQUESTS_COLLECTION), {
    ...submission,
    message: submission.details,
    read: false,
    emailStatus: "pending",
    createdAt: serverTimestamp(),
  });

  return {
    ...submission,
    id: docRef.id,
    submittedAt: new Date().toISOString(),
    read: false,
    emailStatus: "pending",
  } satisfies ContactSubmission;
}

export function listenContactSubmissions(
  onChange: (submissions: ContactSubmission[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const contactQuery = query(
    collection(db, CONTACT_REQUESTS_COLLECTION),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    contactQuery,
    (snapshot) => {
      onChange(
        snapshot.docs.map((document) => normalizeContactSubmission(document.id, document.data())),
      );
    },
    (error) => onError?.(error),
  );
}

export function updateContactSubmissionEmailStatus(
  id: string,
  emailStatus: ContactSubmission["emailStatus"],
) {
  return updateDoc(doc(db, CONTACT_REQUESTS_COLLECTION, id), { emailStatus });
}

export function updateContactSubmissionRead(id: string, read: boolean) {
  return updateDoc(doc(db, CONTACT_REQUESTS_COLLECTION, id), { read });
}

export function deleteContactSubmission(id: string) {
  return deleteDoc(doc(db, CONTACT_REQUESTS_COLLECTION, id));
}
