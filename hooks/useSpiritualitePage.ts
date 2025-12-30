import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export interface Practice {
  _id?: string;
  order?: number;
  title: string;
  slug: string;
  iconName: string;
  published: boolean;
  description: string;
  introduction: string;
  detailedGuide: string;
  affirmation: string;
  category: string;
  bestTiming?: string;
  keyElements: string[];
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  materials?: string[];
}

export interface UseSpiritualitePage {
  practices: Practice[];
  loading: boolean;
  error?: string;
  success?: string;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formData: Practice;
  setFormData: (data: Practice) => void;
  editingPractice?: Practice;
  setEditingPractice: (practice?: Practice) => void;
  saving: boolean;
  deletingId?: string;
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
  addArrayItem: (field: keyof Practice) => void;
  removeArrayItem: (field: keyof Practice, index: number) => void;
  updateArrayItem: (field: keyof Practice, index: number, value: string) => void;
  availableIcons: string[];
  expandedPractices: Set<string>;
  togglePracticeExpanded: (id: string) => void;
  fetchPractices: () => void;
  handleCreate: () => void;
  handleEdit: (practice: Practice) => void;
  handleDelete: (id: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const defaultForm: Practice = {
  title: "",
  slug: "",
  iconName: "Sparkles",
  order: 0,
  published: false,
  description: "",
  introduction: "",
  detailedGuide: "",
  affirmation: "",
  category: "spiritualite-africaine",
  bestTiming: "",
  keyElements: [],
  benefits: [],
  practicalSteps: [],
  warnings: [],
  materials: [],
};

export function useSpiritualitePage(): UseSpiritualitePage {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Practice>(defaultForm);
  const [editingPractice, setEditingPractice] = useState<Practice | undefined>();
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | undefined>();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["basic"]));
  const [expandedPractices, setExpandedPractices] = useState<Set<string>>(new Set());

  const availableIcons = [
    "Sparkles", "Flame", "BookOpen", "Target", "Lightbulb", "Package", "List", "AlertTriangle", "Clock"
  ];

  const fetchPractices = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await axios.get("/api/spiritual-practices");
      setPractices(res.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPractices();
  }, [fetchPractices]);

  const handleCreate = () => {
    setEditingPractice(undefined);
    setFormData(defaultForm);
    setShowForm(true);
    setExpandedSections(new Set(["basic"]));
  };

  const handleEdit = (practice: Practice) => {
    setEditingPractice(practice);
    setFormData({ ...practice });
    setShowForm(true);
    setExpandedSections(new Set(["basic"]));
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError(undefined);
    setSuccess(undefined);
    try {
      await axios.delete(`/api/spiritual-practices/${id}`);
      setSuccess("Pratique supprimée");
      setPractices((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erreur lors de la suppression");
    } finally {
      setDeletingId(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(undefined);
    setSuccess(undefined);
    try {
      if (editingPractice?._id) {
        await axios.put(`/api/spiritual-practices/${editingPractice._id}`, formData);
        setSuccess("Pratique mise à jour");
        setPractices((prev) => prev.map((p) => (p._id === editingPractice._id ? { ...formData, _id: editingPractice._id } : p)));
      } else {
        const res = await axios.post("/api/spiritual-practices", formData);
        setSuccess("Pratique créée");
        setPractices((prev) => [{ ...res.data }, ...prev]);
      }
      setShowForm(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const addArrayItem = (field: keyof Practice) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const removeArrayItem = (field: keyof Practice, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: keyof Practice, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item))
    }));
  };

  const togglePracticeExpanded = (id: string) => {
    setExpandedPractices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return {
    practices,
    loading,
    error,
    success,
    showForm,
    setShowForm,
    formData,
    setFormData,
    editingPractice,
    setEditingPractice,
    saving,
    deletingId,
    expandedSections,
    toggleSection,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    availableIcons,
    expandedPractices,
    togglePracticeExpanded,
    fetchPractices,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
}
