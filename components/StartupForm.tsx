/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState<string>("");

    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);
            const result = await createPitch(prevState, formData, pitch);

            if (result.status === "SUCCESS") {
                toast.success("Startup submitted successfully", {
                    description: "Your startup has been created successfully",
                });
                router.push(`/startup/${result._id}`);
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;

                setError(fieldErorrs as unknown as Record<string, string>);

                toast.error("Error", {
                    description: "Please check your inputs and try again",
                });

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast.error("Error", {
                description: "An unexpected error has occurred",
            });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    })

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input id="title" name="title" required placeholder="Startup Title" className="startup-form_input" />
                {error.title && <p className="startup-form_error">{error.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea id="description" name="description" required placeholder="Startup Description" className="startup-form_textarea" />
                {error.description && <p className="startup-form_error">{error.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input id="category" name="category" required placeholder="Startup Category (Tech, Health, Education...)" className="startup-form_input" />
                {error.category && <p className="startup-form_error">{error.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">Image URL</label>
                <Input id="link" name="link" required placeholder="Startup Image URL" className="startup-form_input" />
                {error.link && <p className="startup-form_error">{error.link}</p>}
            </div>
            {/* Pitch Md editor section */}
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder:
                            "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />

                {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
            </div>
            <Button type="submit" className="startup-form_btn" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="ml-2 size-6" />
            </Button>
        </form>
    )
}

export default StartupForm