"use client";

import { useState } from "react";
import { Trash2, Edit3, MapPin, Clock, ArrowRight, User, AlertTriangle, X, Check } from "lucide-react";
import Image from "next/image";

interface Urgency {
    id: string;
    title: string;
    description: string;
    severity: string;
    location: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

interface UrgencyWithUser {
    urgency: Urgency;
    userName: string | null;
}

interface Props {
    urgencies: UrgencyWithUser[];
    onDelete: (id: string) => Promise<void>;
    onUpdate: (id: string, data: any) => Promise<void>;
}

export default function UrgencyManagementList({ urgencies, onDelete, onUpdate }: Props) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editUrgency, setEditUrgency] = useState<Urgency | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        await onDelete(deleteId);
        setIsDeleting(false);
        setDeleteId(null);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editUrgency) return;
        setIsUpdating(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            severity: formData.get("severity"),
            location: formData.get("location"),
            status: formData.get("status"),
        };
        await onUpdate(editUrgency.id, data);
        setIsUpdating(false);
        setEditUrgency(null);
    };

    return (
        <div className="space-y-6">
            {/* Urgencies List */}
            <div className="grid grid-cols-1 gap-6">
                {urgencies.map(({ urgency: u, userName }) => (
                    <div key={u.id} className="group overflow-hidden rounded-[2.5rem] bg-white border border-zinc-200 hover:border-red-500/30 transition-all duration-300 shadow-sm flex flex-col md:flex-row">
                        {/* Side Status Bar */}
                        <div className={`w-1.5 h-full absolute left-0 top-0 ${u.status === "pending" ? "bg-red-500" :
                                u.status === "investigating" ? "bg-orange-500" : "bg-emerald-500"
                            }`} />

                        <div className="p-8 flex-grow">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${u.severity === "critical" ? "text-red-600 border-red-100 bg-red-50" :
                                        u.severity === "high" ? "text-orange-600 border-orange-100 bg-orange-50" :
                                            "text-zinc-500 border-zinc-100 bg-zinc-50"
                                    }`}>
                                    {u.severity} SEVERITY
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold">
                                    <Clock className="h-3 w-3" />
                                    {u.createdAt.toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest pl-4 border-l border-zinc-100">
                                    <User className="h-3 w-3 text-red-500" />
                                    {userName || "Unknown Unit"}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-zinc-900 uppercase tracking-tight">{u.title}</h3>
                            <p className="text-zinc-500 text-sm font-medium mb-6 max-w-2xl leading-relaxed line-clamp-2">{u.description}</p>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-3 py-1.5 rounded-xl text-xs">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {u.location}
                                </div>
                                <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${u.status === "pending" ? "text-red-600 border-red-100" :
                                        u.status === "investigating" ? "text-orange-600 border-orange-100" : "text-emerald-600 border-emerald-100"
                                    }`}>
                                    {u.status}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-zinc-50/50 border-t md:border-t-0 md:border-l border-zinc-100 flex flex-row md:flex-col justify-center gap-3 min-w-[200px]">
                            <button
                                onClick={() => setEditUrgency(u)}
                                className="flex-grow flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-600 text-[10px] font-black uppercase tracking-widest py-3 rounded-2xl transition-all shadow-sm active:scale-95"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => setDeleteId(u.id)}
                                className="flex-grow flex items-center justify-center gap-2 bg-white border border-red-100 hover:bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest py-3 rounded-2xl transition-all shadow-sm active:scale-95"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* DELETE CONFIRMATION MODAL */}
            {deleteId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 h-full w-full">
                    <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
                    <div className="relative bg-white rounded-[2.5rem] border border-zinc-200 shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 fade-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                                <AlertTriangle className="h-8 w-8" />
                            </div>
                            <h4 className="text-2xl font-black tracking-tight text-zinc-900 mb-2">TERMINATE REPORT?</h4>
                            <p className="text-zinc-500 font-medium mb-8">This action is permanent and will remove the incident from the emergency network.</p>

                            <div className="grid grid-cols-2 gap-3 w-full">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-red-900/20 active:scale-95"
                                >
                                    {isDeleting ? "Deleting..." : "Confirm Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT FORM MODAL */}
            {editUrgency && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 h-full w-full">
                    <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setEditUrgency(null)} />
                    <div className="relative bg-white rounded-[3rem] border border-zinc-200 shadow-2xl p-10 max-w-2xl w-full animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-red-50 rounded-2xl">
                                    <Edit3 className="h-5 w-5 text-red-600" />
                                </div>
                                <h4 className="text-2xl font-black tracking-tight text-zinc-900">EDIT INCIDENT</h4>
                            </div>
                            <button onClick={() => setEditUrgency(null)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <X className="h-5 w-5 text-zinc-400" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Title</label>
                                <input
                                    name="title"
                                    defaultValue={editUrgency.title}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editUrgency.description}
                                    rows={4}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Location</label>
                                    <input
                                        name="location"
                                        defaultValue={editUrgency.location}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Severity</label>
                                    <select
                                        name="severity"
                                        defaultValue={editUrgency.severity}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Status Protocol</label>
                                <select
                                    name="status"
                                    defaultValue={editUrgency.status}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="investigating">Investigating</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditUrgency(null)}
                                    className="flex-grow bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest transition-all"
                                >
                                    Discard Changes
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-grow bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-red-900/20 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {isUpdating ? "Updating..." : (
                                        <>
                                            Save Modifications
                                            <Check className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
