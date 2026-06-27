import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  FolderKanban,
  Home,
  Image as ImageIcon,
  LockKeyhole,
  LogIn,
  MessageSquare,
  Plus,
  Save,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import {
  createContentId,
  createReadableContentId,
  defaultSiteContent,
  type CompanyLinks,
  type PortfolioProject,
  type SiteContent,
  type TeamMember,
  useSiteContent,
} from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload";
import {
  deleteContactSubmission,
  listenContactSubmissions,
  updateContactSubmissionRead,
  type ContactSubmission,
} from "@/lib/contact-submissions";
import { ADMIN_EMAIL, useGoogleAuth } from "@/lib/google-auth";

const emptyTeamMember = (): TeamMember => ({
  id: createContentId("team"),
  name: "",
  role: "",
  photo: "",
  linkedinUrl: "",
  githubUrl: "",
  twitterUrl: "",
});

const emptyProject = (): PortfolioProject => ({
  id: createContentId("project"),
  title: "",
  category: "",
  result: "",
  grad: "bg-gradient-flag",
  image: "",
  githubUrl: "",
  liveUrl: "",
});

function fieldLabel(text: string) {
  return <span className="text-xs font-semibold uppercase text-muted-foreground">{text}</span>;
}

function updateById<T extends { id: string }>(items: T[], id: string, patch: Partial<T>) {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

function readStatusClass(read: boolean) {
  return read
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-amber-200 bg-amber-50 text-amber-700";
}

function uniqueReadableId(text: string, fallbackPrefix: string, existingIds: string[]) {
  const baseId = createReadableContentId(text, fallbackPrefix);

  if (!existingIds.includes(baseId)) {
    return baseId;
  }

  let suffix = 2;
  let nextId = `${baseId}-${suffix}`;

  while (existingIds.includes(nextId)) {
    suffix += 1;
    nextId = `${baseId}-${suffix}`;
  }

  return nextId;
}

type AdminSection = "contact-requests" | "company-links" | "team-members" | "projects";
type PendingDelete =
  | { type: "contact"; item: ContactSubmission }
  | { type: "team"; item: TeamMember }
  | { type: "project"; item: PortfolioProject };

const adminSections: Array<{ id: AdminSection; label: string }> = [
  { id: "contact-requests", label: "Contact Requests" },
  { id: "company-links", label: "Company Links" },
  { id: "team-members", label: "Team Members" },
  { id: "projects", label: "Projects" },
];

export function Admin() {
  const { content, saveContent } = useSiteContent();
  const { ready, user, isAdmin, logout } = useGoogleAuth();
  const [draft, setDraft] = useState<SiteContent>(defaultSiteContent);
  const [status, setStatus] = useState("Ready");
  const [activeSection, setActiveSection] = useState<AdminSection>("contact-requests");
  const [contactOpen, setContactOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [newTeamDraft, setNewTeamDraft] = useState<TeamMember | null>(null);
  const [newProjectDraft, setNewProjectDraft] = useState<PortfolioProject | null>(null);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedContactSubmission, setSelectedContactSubmission] =
    useState<ContactSubmission | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    if (!isAdmin) return;

    return listenContactSubmissions(setContactSubmissions, () =>
      setStatus("Could not load contact requests from Firestore. Login again as admin."),
    );
  }, [isAdmin]);

  const updateTeam = (id: string, patch: Partial<TeamMember>) => {
    setDraft((current) => ({
      ...current,
      team: updateById(current.team, id, patch),
    }));
  };

  const updateProject = (id: string, patch: Partial<PortfolioProject>) => {
    setDraft((current) => ({
      ...current,
      portfolioProjects: updateById(current.portfolioProjects, id, patch),
    }));
  };

  const updateCompanyLinks = (patch: Partial<CompanyLinks>) => {
    setDraft((current) => ({
      ...current,
      companyLinks: { ...current.companyLinks, ...patch },
    }));
  };

  const addTeamMember = () => {
    setTeamOpen(true);
    setNewTeamDraft((current) => current ?? emptyTeamMember());
  };

  const addProject = () => {
    setProjectsOpen(true);
    setNewProjectDraft((current) => current ?? emptyProject());
  };

  const saveNewTeamMember = () => {
    if (!newTeamDraft) return;

    setDraft((current) => ({
      ...current,
      team: [
        ...current.team,
        {
          ...newTeamDraft,
          id: uniqueReadableId(
            newTeamDraft.name,
            "team",
            current.team.map((member) => member.id),
          ),
        },
      ],
    }));
    setNewTeamDraft(null);
    setStatus("Team member added. Click Save Changes to publish it on the website.");
  };

  const saveNewProject = () => {
    if (!newProjectDraft) return;

    setDraft((current) => ({
      ...current,
      portfolioProjects: [
        ...current.portfolioProjects,
        {
          ...newProjectDraft,
          id: uniqueReadableId(
            newProjectDraft.title,
            "project",
            current.portfolioProjects.map((project) => project.id),
          ),
        },
      ],
    }));
    setNewProjectDraft(null);
    setStatus("Project added. Click Save Changes to publish it on the website.");
  };

  const submitNewTeamMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveNewTeamMember();
  };

  const submitNewProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveNewProject();
  };

  const save = async () => {
    try {
      await saveContent(draft);
      setStatus(
        "Saved to Firestore. Refresh the website or go back home to see the latest content.",
      );
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save to Firestore.");
    }
  };

  const openContactSubmission = async (submission: ContactSubmission) => {
    setSelectedContactSubmission(submission);

    if (!submission.read) {
      try {
        await updateContactSubmissionRead(submission.id, true);
      } catch {
        setStatus("Could not mark the contact request as read.");
      }
    }
  };

  const toggleContactRead = async (submission: ContactSubmission) => {
    try {
      await updateContactSubmissionRead(submission.id, !submission.read);
      setSelectedContactSubmission((current) =>
        current?.id === submission.id ? { ...current, read: !submission.read } : current,
      );
    } catch {
      setStatus("Could not update the contact request read status.");
    }
  };

  const deleteContactRequest = async (submission: ContactSubmission) => {
    try {
      await deleteContactSubmission(submission.id);
      setSelectedContactSubmission((current) => (current?.id === submission.id ? null : current));
      setStatus("Deleted the selected contact request from Firestore.");
    } catch {
      setStatus("Could not delete the contact request from Firestore.");
    }
  };

  const deleteTeamMember = (member: TeamMember) => {
    setDraft((current) => ({
      ...current,
      team: current.team.filter((item) => item.id !== member.id),
    }));
    setStatus("Team member deleted. Click Save Changes to publish it on the website.");
  };

  const deleteProject = (project: PortfolioProject) => {
    setDraft((current) => ({
      ...current,
      portfolioProjects: current.portfolioProjects.filter((item) => item.id !== project.id),
    }));
    setStatus("Project deleted. Click Save Changes to publish it on the website.");
  };

  const confirmPendingDelete = async () => {
    if (!pendingDelete) return;

    if (pendingDelete.type === "contact") await deleteContactRequest(pendingDelete.item);
    if (pendingDelete.type === "team") deleteTeamMember(pendingDelete.item);
    if (pendingDelete.type === "project") deleteProject(pendingDelete.item);
    setPendingDelete(null);
  };

  const showSection = (id: AdminSection) => {
    setActiveSection(id);
  };

  const uploadTeamPhoto = async (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatus("Uploading team image to Cloudinary/luxgen/team...");
      const saved = await uploadImageToCloudinary(file, "team");
      updateTeam(id, { photo: saved.secureUrl, photoPublicId: saved.publicId });
      setStatus(
        `Uploaded ${saved.fileName} to Cloudinary/luxgen/team. Click Save Changes to keep it on the website.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not upload to Cloudinary/luxgen/team.",
      );
    }
  };

  const uploadNewTeamPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatus("Uploading team image to Cloudinary/luxgen/team...");
      const saved = await uploadImageToCloudinary(file, "team");
      setNewTeamDraft((current) =>
        current ? { ...current, photo: saved.secureUrl, photoPublicId: saved.publicId } : current,
      );
      setStatus(
        `Uploaded ${saved.fileName} to Cloudinary/luxgen/team. Save the new member to add it to the list.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not upload to Cloudinary/luxgen/team.",
      );
    }
  };

  const uploadProjectImage = async (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatus("Uploading project image to Cloudinary/luxgen/projects...");
      const saved = await uploadImageToCloudinary(file, "projects");
      updateProject(id, { image: saved.secureUrl, imagePublicId: saved.publicId });
      setStatus(
        `Uploaded ${saved.fileName} to Cloudinary/luxgen/projects. Click Save Changes to keep it on the website.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not upload to Cloudinary/luxgen/projects.",
      );
    }
  };

  const uploadNewProjectImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatus("Uploading project image to Cloudinary/luxgen/projects...");
      const saved = await uploadImageToCloudinary(file, "projects");
      setNewProjectDraft((current) =>
        current ? { ...current, image: saved.secureUrl, imagePublicId: saved.publicId } : current,
      );
      setStatus(
        `Uploaded ${saved.fileName} to Cloudinary/luxgen/projects. Save the new project to add it to the list.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not upload to Cloudinary/luxgen/projects.",
      );
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-sm font-medium text-muted-foreground">Checking login...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-sky px-4 py-10">
        <section className="w-full max-w-md rounded-2xl border border-border bg-card p-5 text-center shadow-elegant sm:p-7">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-flag text-primary-foreground shadow-glow-red">
            <LockKeyhole className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
            Admin login required
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This page is only available for {ADMIN_EMAIL}. Login with that Gmail account to manage
            website content.
          </p>
          {user && (
            <p className="mt-4 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground">
              Current account: {user.email}
            </p>
          )}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild>
              <a href="/login?redirect=/admin">
                <LogIn className="h-4 w-4" />
                Login
              </a>
            </Button>
            {user && (
              <Button type="button" variant="outline" onClick={logout}>
                Logout
              </Button>
            )}
            <Button asChild variant="outline">
              <a href="/">
                <Home className="h-4 w-4" />
                Website
              </a>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-secondary">LuxGen Admin</p>
            <h1 className="mt-0.5 text-balance font-display text-lg font-bold text-foreground sm:mt-1 sm:text-2xl">
              Website Content Control
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:justify-end sm:gap-2">
            <Button
              asChild
              variant="outline"
              className="h-9 w-full text-xs sm:h-10 sm:w-auto sm:text-sm"
            >
              <a href="/">
                <Home className="h-4 w-4" />
                Website
              </a>
            </Button>
            <Button
              type="button"
              onClick={save}
              className="h-9 w-full text-xs sm:h-10 sm:w-auto sm:text-sm"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1.5 px-2 py-2 sm:flex sm:overflow-x-auto sm:px-6 sm:py-3 lg:px-8">
          {adminSections.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => showSection(item.id)}
              className={`min-h-9 rounded-md border px-2 py-1.5 text-center text-[11px] font-semibold leading-tight transition-colors sm:min-h-10 sm:shrink-0 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm ${
                activeSection === item.id
                  ? "border-secondary bg-secondary text-secondary-foreground shadow-soft"
                  : "border-border bg-card text-foreground hover:bg-muted hover:text-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <Dialog open={Boolean(newTeamDraft)} onOpenChange={(open) => !open && setNewTeamDraft(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto p-3 sm:max-w-3xl sm:p-6">
          <DialogHeader>
            <DialogTitle>New Team Member</DialogTitle>
            <DialogDescription>
              Fill the required fields, then save to add this member to the list.
            </DialogDescription>
          </DialogHeader>

          {newTeamDraft && (
            <form onSubmit={submitNewTeamMember} className="grid gap-3 sm:gap-4">
              <div className="grid gap-3 sm:gap-4 lg:grid-cols-[120px_1fr]">
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-border bg-muted sm:h-24 sm:w-24">
                    {newTeamDraft.photo ? (
                      <img
                        src={newTeamDraft.photo}
                        alt={newTeamDraft.name || "New team member"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted sm:mt-3 sm:py-2">
                    <Upload className="h-3.5 w-3.5" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={uploadNewTeamPhoto}
                    />
                  </label>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                  <label className="space-y-1">
                    {fieldLabel("Name *")}
                    <Input
                      required
                      value={newTeamDraft.name}
                      onChange={(event) =>
                        setNewTeamDraft((current) =>
                          current ? { ...current, name: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("Role *")}
                    <Input
                      required
                      value={newTeamDraft.role}
                      onChange={(event) =>
                        setNewTeamDraft((current) =>
                          current ? { ...current, role: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("LinkedIn Link")}
                    <Input
                      value={newTeamDraft.linkedinUrl ?? ""}
                      onChange={(event) =>
                        setNewTeamDraft((current) =>
                          current ? { ...current, linkedinUrl: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("GitHub Link")}
                    <Input
                      value={newTeamDraft.githubUrl ?? ""}
                      onChange={(event) =>
                        setNewTeamDraft((current) =>
                          current ? { ...current, githubUrl: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1 sm:col-span-2">
                    {fieldLabel("Twitter/X Link")}
                    <Input
                      value={newTeamDraft.twitterUrl ?? ""}
                      onChange={(event) =>
                        setNewTeamDraft((current) =>
                          current ? { ...current, twitterUrl: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:space-x-0">
                <Button type="button" variant="outline" onClick={() => setNewTeamDraft(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4" />
                  Save Member
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(newProjectDraft)}
        onOpenChange={(open) => !open && setNewProjectDraft(null)}
      >
        <DialogContent className="max-h-[88vh] overflow-y-auto p-3 sm:max-w-4xl sm:p-6">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Fill the required fields, then save to add this project to the list.
            </DialogDescription>
          </DialogHeader>

          {newProjectDraft && (
            <form onSubmit={submitNewProject} className="grid gap-3 sm:gap-4">
              <div className="grid gap-3 sm:gap-4 md:grid-cols-[220px_1fr]">
                <div>
                  <div
                    className={`flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg ${newProjectDraft.grad}`}
                  >
                    {newProjectDraft.image ? (
                      <img
                        src={newProjectDraft.image}
                        alt={newProjectDraft.title || "New project"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-9 w-9 text-primary-foreground/80" />
                    )}
                  </div>
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted sm:mt-3 sm:py-2">
                    <Upload className="h-3.5 w-3.5" />
                    Upload/Reupload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={uploadNewProjectImage}
                    />
                  </label>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                  <label className="space-y-1">
                    {fieldLabel("Project Title *")}
                    <Input
                      required
                      value={newProjectDraft.title}
                      onChange={(event) =>
                        setNewProjectDraft((current) =>
                          current ? { ...current, title: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("Category *")}
                    <Input
                      required
                      value={newProjectDraft.category}
                      onChange={(event) =>
                        setNewProjectDraft((current) =>
                          current ? { ...current, category: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("Result *")}
                    <Input
                      required
                      value={newProjectDraft.result}
                      onChange={(event) =>
                        setNewProjectDraft((current) =>
                          current ? { ...current, result: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("Card Accent")}
                    <select
                      value={newProjectDraft.grad}
                      onChange={(event) =>
                        setNewProjectDraft((current) =>
                          current
                            ? {
                                ...current,
                                grad: event.target.value as PortfolioProject["grad"],
                              }
                            : current,
                        )
                      }
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="bg-gradient-flag">Flag</option>
                      <option value="bg-gradient-sunset">Sunset</option>
                    </select>
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("GitHub Link")}
                    <Input
                      value={newProjectDraft.githubUrl ?? ""}
                      onChange={(event) =>
                        setNewProjectDraft((current) =>
                          current ? { ...current, githubUrl: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                  <label className="space-y-1">
                    {fieldLabel("Live Link")}
                    <Input
                      value={newProjectDraft.liveUrl ?? ""}
                      onChange={(event) =>
                        setNewProjectDraft((current) =>
                          current ? { ...current, liveUrl: event.target.value } : current,
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:space-x-0">
                <Button type="button" variant="outline" onClick={() => setNewProjectDraft(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4" />
                  Save Project
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(selectedContactSubmission)}
        onOpenChange={(open) => !open && setSelectedContactSubmission(null)}
      >
        <DialogContent className="max-h-[88vh] overflow-y-auto p-4 sm:max-w-3xl sm:p-6">
          <DialogHeader>
            <DialogTitle>Contact Request Details</DialogTitle>
            <DialogDescription>
              Full message and contact information from the website form.
            </DialogDescription>
          </DialogHeader>

          {selectedContactSubmission &&
            (() => {
              const loginEmail =
                selectedContactSubmission.accountEmail || selectedContactSubmission.email;

              return (
                <div className="grid gap-4">
                  <div className="rounded-lg border border-border bg-muted p-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {selectedContactSubmission.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedContactSubmission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="w-fit rounded-full bg-background px-3 py-1 text-xs font-semibold text-secondary">
                          {selectedContactSubmission.service}
                        </span>
                        <span
                          className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${readStatusClass(
                            selectedContactSubmission.read,
                          )}`}
                        >
                          {selectedContactSubmission.read ? "Read" : "Unread"}
                        </span>
                        <span className="w-fit rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                          Email {selectedContactSubmission.emailStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold uppercase text-muted-foreground">
                        Login Email
                      </dt>
                      <dd className="break-words font-medium text-foreground">
                        <a href={`mailto:${loginEmail}`} className="hover:text-secondary">
                          {loginEmail || "Not available"}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase text-muted-foreground">
                        Phone
                      </dt>
                      <dd className="break-words font-medium text-foreground">
                        {selectedContactSubmission.phone ? (
                          <a
                            href={`tel:${selectedContactSubmission.phone}`}
                            className="hover:text-secondary"
                          >
                            {selectedContactSubmission.phone}
                          </a>
                        ) : (
                          "Not provided"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase text-muted-foreground">
                        Company
                      </dt>
                      <dd className="break-words font-medium text-foreground">
                        {selectedContactSubmission.company || "Not provided"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase text-muted-foreground">
                        Budget
                      </dt>
                      <dd className="font-medium text-foreground">
                        {selectedContactSubmission.budget}
                      </dd>
                    </div>
                  </dl>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-xs font-semibold uppercase text-muted-foreground">
                      Project Details
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {selectedContactSubmission.details}
                    </p>
                  </div>

                  <DialogFooter className="gap-2 sm:space-x-0">
                    <Button
                      type="button"
                      variant="outline"
                      className={readStatusClass(!selectedContactSubmission.read)}
                      onClick={() => toggleContactRead(selectedContactSubmission)}
                    >
                      {selectedContactSubmission.read ? "Mark Unread" : "Mark Read"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        setPendingDelete({ type: "contact", item: selectedContactSubmission })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </DialogFooter>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent className="w-[calc(100%-1.5rem)] max-w-sm rounded-xl p-4 sm:max-w-md sm:p-6">
          <AlertDialogHeader className="space-y-1.5 text-left sm:space-y-2">
            <AlertDialogTitle className="font-display text-base sm:text-lg">
              Delete this item?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs leading-relaxed sm:text-sm">
              This action cannot be undone from the admin panel. Confirm only if you want to remove
              it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:space-x-0">
            <AlertDialogCancel className="mt-0 w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 sm:w-auto"
              onClick={confirmPendingDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <main className="mx-auto max-w-7xl px-2 py-3 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-3 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-medium text-foreground sm:mb-6 sm:px-4 sm:py-3 sm:text-sm">
          {status}
        </div>

        <Collapsible asChild open={contactOpen} onOpenChange={setContactOpen}>
          <section
            id="contact-requests"
            className={`rounded-lg border border-border bg-card p-2 shadow-soft sm:rounded-xl sm:p-6 ${
              activeSection === "contact-requests" ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <CollapsibleTrigger className="group flex min-w-0 flex-1 items-start justify-between gap-3 rounded-lg text-left outline-none transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground group-hover:text-secondary sm:text-xl">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                    Contact Requests
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    View messages submitted through the contact form.
                  </p>
                </div>
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <div className="grid gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus("Contact requests update live from Firestore.")}
                  className="h-9 w-full text-xs sm:h-10 sm:w-auto sm:text-sm"
                >
                  Live
                </Button>
              </div>
            </div>

            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-4">
                {contactSubmissions.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border bg-background px-4 py-8 text-center text-sm text-muted-foreground">
                    No contact requests yet.
                  </div>
                ) : (
                  contactSubmissions.map((submission) => (
                    <article
                      key={submission.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => openContactSubmission(submission)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openContactSubmission(submission);
                        }
                      }}
                      className="rounded-lg border border-border bg-background p-2.5 text-left transition-colors hover:border-secondary hover:bg-muted/60 sm:p-4"
                    >
                      {(() => {
                        const loginEmail = submission.accountEmail || submission.email;

                        return (
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-display text-lg font-bold text-foreground">
                                  {submission.name}
                                </h3>
                                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-secondary">
                                  {submission.service}
                                </span>
                                <span
                                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${readStatusClass(
                                    submission.read,
                                  )}`}
                                >
                                  {submission.read ? "Read" : "Unread"}
                                </span>
                                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                                  Email {submission.emailStatus}
                                </span>
                              </div>
                              <div className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-3">
                                <span>{new Date(submission.submittedAt).toLocaleString()}</span>
                                <span className="break-words">{loginEmail || "No email"}</span>
                                <span>{submission.phone || "No phone"}</span>
                              </div>
                              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/80">
                                {submission.details}
                              </p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={readStatusClass(!submission.read)}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  toggleContactRead(submission);
                                }}
                              >
                                {submission.read ? "Unread" : "Read"}
                              </Button>
                              <Button type="button" variant="outline" size="sm">
                                View
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                aria-label={`Delete message from ${submission.name}`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setPendingDelete({ type: "contact", item: submission });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })()}
                    </article>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </section>
        </Collapsible>

        <section
          id="company-links"
          className={`rounded-lg border border-border bg-card p-2 shadow-soft sm:rounded-xl sm:p-6 ${
            activeSection === "company-links" ? "block" : "hidden"
          }`}
        >
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground sm:text-xl">
              <ExternalLink className="h-5 w-5 text-secondary" />
              Company Links
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Control the company social links shown in the footer.
            </p>
          </div>

          <div className="mt-3 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            <label className="space-y-1">
              {fieldLabel("LinkedIn")}
              <Input
                value={draft.companyLinks.linkedinUrl ?? ""}
                onChange={(event) => updateCompanyLinks({ linkedinUrl: event.target.value })}
              />
            </label>
            <label className="space-y-1">
              {fieldLabel("Facebook")}
              <Input
                value={draft.companyLinks.facebookUrl ?? ""}
                onChange={(event) => updateCompanyLinks({ facebookUrl: event.target.value })}
              />
            </label>
            <label className="space-y-1">
              {fieldLabel("Instagram")}
              <Input
                value={draft.companyLinks.instagramUrl ?? ""}
                onChange={(event) => updateCompanyLinks({ instagramUrl: event.target.value })}
              />
            </label>
            <label className="space-y-1">
              {fieldLabel("GitHub")}
              <Input
                value={draft.companyLinks.githubUrl ?? ""}
                onChange={(event) => updateCompanyLinks({ githubUrl: event.target.value })}
              />
            </label>
          </div>
        </section>

        <Collapsible asChild open={teamOpen} onOpenChange={setTeamOpen}>
          <section
            id="team-members"
            className={`rounded-lg border border-border bg-card p-2 shadow-soft sm:rounded-xl sm:p-6 ${
              activeSection === "team-members" ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <CollapsibleTrigger className="group flex min-w-0 flex-1 items-start justify-between gap-3 rounded-lg text-left outline-none transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground group-hover:text-secondary sm:text-xl">
                    <Users className="h-5 w-5 text-secondary" />
                    Team Members
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add people, edit roles, and attach optional social links.
                  </p>
                </div>
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <Button
                type="button"
                variant="secondary"
                onClick={addTeamMember}
                disabled={Boolean(newTeamDraft)}
                className="h-9 w-full text-xs sm:h-10 sm:w-auto sm:text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </div>

            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-4">
                {draft.team.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-lg border border-border bg-background p-2.5 sm:p-4"
                  >
                    <div className="grid gap-3 sm:gap-4 lg:grid-cols-[120px_1fr_auto]">
                      <div className="flex flex-col items-center sm:items-start">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-border bg-muted sm:h-24 sm:w-24">
                          {member.photo ? (
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted sm:mt-3 sm:py-2">
                          <Upload className="h-3.5 w-3.5" />
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => uploadTeamPhoto(member.id, event)}
                          />
                        </label>
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                        <label className="space-y-1">
                          {fieldLabel("Name")}
                          <Input
                            value={member.name}
                            onChange={(event) =>
                              updateTeam(member.id, { name: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("Role")}
                          <Input
                            value={member.role}
                            onChange={(event) =>
                              updateTeam(member.id, { role: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("LinkedIn Link")}
                          <Input
                            value={member.linkedinUrl ?? ""}
                            onChange={(event) =>
                              updateTeam(member.id, { linkedinUrl: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("GitHub Link")}
                          <Input
                            value={member.githubUrl ?? ""}
                            onChange={(event) =>
                              updateTeam(member.id, { githubUrl: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1 sm:col-span-2">
                          {fieldLabel("Twitter/X Link")}
                          <Input
                            value={member.twitterUrl ?? ""}
                            onChange={(event) =>
                              updateTeam(member.id, { twitterUrl: event.target.value })
                            }
                          />
                        </label>
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-9 w-full lg:h-10 lg:w-10"
                        aria-label={`Delete ${member.name}`}
                        onClick={() => setPendingDelete({ type: "team", item: member })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </section>
        </Collapsible>

        <Collapsible asChild open={projectsOpen} onOpenChange={setProjectsOpen}>
          <section
            id="projects"
            className={`rounded-lg border border-border bg-card p-2 shadow-soft sm:rounded-xl sm:p-6 ${
              activeSection === "projects" ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <CollapsibleTrigger className="group flex min-w-0 flex-1 items-start justify-between gap-3 rounded-lg text-left outline-none transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground group-hover:text-secondary sm:text-xl">
                    <FolderKanban className="h-5 w-5 text-secondary" />
                    Projects
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add projects, delete old ones, and replace project images anytime.
                  </p>
                </div>
                <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <Button
                type="button"
                variant="secondary"
                onClick={addProject}
                disabled={Boolean(newProjectDraft)}
                className="h-9 w-full text-xs sm:h-10 sm:w-auto sm:text-sm"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </div>

            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-4">
                {draft.portfolioProjects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg border border-border bg-background p-2.5 sm:p-4"
                  >
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_auto]">
                      <div>
                        <div
                          className={`flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg ${project.grad}`}
                        >
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-9 w-9 text-primary-foreground/80" />
                          )}
                        </div>
                        <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted sm:mt-3 sm:py-2">
                          <Upload className="h-3.5 w-3.5" />
                          Upload/Reupload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => uploadProjectImage(project.id, event)}
                          />
                        </label>
                      </div>

                      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                        <label className="space-y-1">
                          {fieldLabel("Project Title")}
                          <Input
                            value={project.title}
                            onChange={(event) =>
                              updateProject(project.id, { title: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("Category")}
                          <Input
                            value={project.category}
                            onChange={(event) =>
                              updateProject(project.id, { category: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("Result")}
                          <Input
                            value={project.result}
                            onChange={(event) =>
                              updateProject(project.id, { result: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("Card Accent")}
                          <select
                            value={project.grad}
                            onChange={(event) =>
                              updateProject(project.id, {
                                grad: event.target.value as PortfolioProject["grad"],
                              })
                            }
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <option value="bg-gradient-flag">Flag</option>
                            <option value="bg-gradient-sunset">Sunset</option>
                          </select>
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("GitHub Link")}
                          <Input
                            value={project.githubUrl ?? ""}
                            onChange={(event) =>
                              updateProject(project.id, { githubUrl: event.target.value })
                            }
                          />
                        </label>
                        <label className="space-y-1">
                          {fieldLabel("Live Link")}
                          <Input
                            value={project.liveUrl ?? ""}
                            onChange={(event) =>
                              updateProject(project.id, { liveUrl: event.target.value })
                            }
                          />
                        </label>
                      </div>

                      <div className="flex gap-2 md:col-span-2 lg:col-span-1 lg:flex-col">
                        {project.liveUrl && (
                          <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="h-9 flex-1 lg:h-10 lg:w-10 lg:flex-none"
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open ${project.title}`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-9 flex-1 lg:h-10 lg:w-10 lg:flex-none"
                          aria-label={`Delete ${project.title}`}
                          onClick={() => setPendingDelete({ type: "project", item: project })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </section>
        </Collapsible>
      </main>
    </div>
  );
}
