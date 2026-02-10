import { EditPromptError } from '@/components/admin/prompts/EditPromptError';
import { EditPromptShell } from '@/components/admin/prompts/EditPromptShell';
import { ConsultationChoiceWithPrompt } from '@/hooks/admin/useConsultationChoices';
import { promptService } from '@/lib/api/services/prompt.service';
import { cx } from '@/lib/functions';
import { CreatePromptDto } from '@/lib/types/prompt.types';
import { AlertTriangle, Save } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import PromptFormHeader from '../prompts/PromptFormHeader';
import PromptFormStatPill from '../prompts/PromptFormStatPill';

interface InlinePromptEditorProps {
    choice: ConsultationChoiceWithPrompt;
    onDone: () => void;
}

function safeStr(v: unknown) {
    return typeof v === "string" ? v : "";
}

function countLines(s: string) {
    if (!s) return 0;
    return s.split("\n").length;
}

export function InlinePromptEditor({ choice, onDone }: InlinePromptEditorProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreatePromptDto>({
        title: choice?.title || '',
        description: choice?.description || '',
        prompt: choice?.prompt || '',
        choiceId: choice?._id || ''
    });

    const updateField = useCallback((field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            if (choice?._id) {
                await promptService.update(choice._id, { prompt: formData.prompt });
            }
            if (onDone) {
                onDone();
                return;
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Erreur lors de la sauvegarde');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [formData, choice, onDone]);

    const initialPromptRef = useRef<string>(formData.prompt);
    const promptValue = formData.prompt;

    const stats = useMemo(() => {
        const len = promptValue.length;
        const lines = countLines(promptValue);
        return { len, lines };
    }, [promptValue]);

    const isDirty = useMemo(() => promptValue !== initialPromptRef.current, [promptValue]);

    const onChangePrompt = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            updateField("prompt" as any, e.target.value);
        },
        [updateField]
    );

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            await handleSubmit();
            initialPromptRef.current = safeStr((formData as any)?.prompt);
        },
        [handleSubmit, formData]
    );

    if (!choice) {
        return (
            <EditPromptShell>
                <EditPromptError error="Choix introuvable" />
            </EditPromptShell>
        );
    }

    return (
        <EditPromptShell>
            <div className="w-full grid place-items-center px-3 py-6 sm:px-4 sm:py-8">
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

                <form onSubmit={onSubmit} className="w-full max-w-6xl">
                    <div className="mt-4 space-y-4 max-w-6xl mx-auto">

                        {/* Error */}
                        {error ? (
                            <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-center">
                                <div className="text-[12px] font-semibold text-rose-700 dark:text-rose-300">
                                    {error}
                                </div>
                            </div>
                        ) : null}

                        {/* Card principale */}
                        <section
                            className={cx(
                                "rounded-3xl border",
                                "border-slate-200/70 dark:border-white/10",
                                "bg-white/80 dark:bg-slate-950/60",
                                "backdrop-blur-xl",
                                "shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.40)]",
                                "p-4 sm:p-6"
                            )}
                        >

                            <div className="mt-4 grid gap-3 text-center">

                                <PromptFormHeader
                                    title={choice?.title || "Consultation"}
                                    isSaving={loading}
                                    onSave={undefined}
                                />

                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    {isDirty ? (
                                        <PromptFormStatPill kind="warn">
                                            <AlertTriangle className="h-4 w-4" />
                                            Modifications non sauvegardées
                                        </PromptFormStatPill>
                                    ) : (
                                        <PromptFormStatPill kind="ok">
                                            <Save className="h-4 w-4" />
                                            Prêt à enregistrer
                                        </PromptFormStatPill>
                                    )}
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                        {stats.len} caractères • {stats.lines} lignes
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-end justify-center gap-2 mb-2">
                                        <label className="block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                                            Prompt   <span className="text-rose-600">*</span>
                                        </label>

                                    </div>

                                    <textarea
                                        value={promptValue}
                                        onChange={onChangePrompt}
                                        required
                                        rows={14}
                                        spellCheck={false}
                                        className={cx(
                                            "w-full rounded-2xl border",
                                            "border-black/10 dark:border-white/10",
                                            "bg-white/80 dark:bg-white/[0.06]",
                                            "px-3 py-3",
                                            "text-[12px] sm:text-[13px]",
                                            "text-slate-900 dark:text-slate-100",
                                            "font-mono leading-relaxed",
                                            "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60",
                                            "min-h-[220px]"
                                        )}
                                        placeholder={[
                                            "Ex:",
                                            "Tu es un expert astrologue. Rédige une analyse structurée…",
                                            "",
                                            "Contraintes :",
                                            "- Ton chaleureux, clair",
                                            "- Chapitres ##, listes, synthèse",
                                            "- Ne pas inventer les données",
                                        ].join("\n")}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="pt-1 flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={cx(
                                            "inline-flex items-center justify-center gap-2",
                                            "h-12 w-full sm:w-auto",
                                            "px-5 rounded-2xl",
                                            "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600",
                                            "text-white font-semibold",
                                            "shadow-lg shadow-fuchsia-500/15",
                                            "hover:opacity-[0.98] transition",
                                            "disabled:opacity-50 disabled:cursor-not-allowed"
                                        )}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                Enregistrement…
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-5 w-5" />
                                                Enregistrer
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </EditPromptShell>
    );
}