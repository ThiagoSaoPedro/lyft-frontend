"use client"

//* Libraries imports
import { motion } from "framer-motion"
import { Copy, Trash2 } from "lucide-react"
import { useFieldArray } from "react-hook-form"

export function ExerciseCard({ index, register, control, remove, duplicate, notify }: any) {
    //* HOOKS * //
    const {
        fields: setFields,
        append: appendSet,
        remove: removeSet,
    } = useFieldArray({
        control,
        name: `exercises.${index}.sets_config`,
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            id={`exercise-card-${index}`}
            className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent relative group"
        >
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-gray-500">
                            {index + 1}
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">
                                Nome do Exercicio
                            </label>
                            <input
                                {...register(`exercises.${index}.name`)}
                                id={`exercise-name-input-${index}`}
                                className="w-full bg-transparent border-b border-white/10 py-2 text-lg font-bold outline-none focus:border-primary transition-all"
                                placeholder="Ex: Supino Inclinado"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Configuracao de Series
                            </span>
                            <button
                                id={`add-set-block-${index}`}
                                type="button"
                                onClick={() => appendSet({ type: "work", count: 3, reps: "10-12" })}
                                className="text-[10px] font-black text-primary hover:underline"
                            >
                                + Add Bloco
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {setFields.map((set, setIdx) => (
                                <div
                                    key={set.id}
                                    id={`exercise-${index}-set-${setIdx}`}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 transition-all hover:border-white/10"
                                >
                                    <div className="flex-1">
                                        <select
                                            {...register(`exercises.${index}.sets_config.${setIdx}.type`)}
                                            id={`exercise-${index}-set-${setIdx}-type`}
                                            className="bg-white/5 text-xs font-bold text-white outline-none w-full capitalize p-2 rounded-lg cursor-pointer border border-white/10 focus:border-primary transition-all"
                                        >
                                            <option value="warmup" className="bg-[#09090b] text-white">
                                                Aquecimento
                                            </option>
                                            <option value="feeder" className="bg-[#09090b] text-white">
                                                Feeder Set
                                            </option>
                                            <option value="work" className="bg-[#09090b] text-white">
                                                Work Set (Main)
                                            </option>
                                            <option value="dropset" className="bg-[#09090b] text-white">
                                                Drop Set
                                            </option>
                                        </select>
                                    </div>
                                    <div className="w-20 space-y-1">
                                        <label className="text-[8px] font-black text-gray-600 block uppercase">Sets</label>
                                        <input
                                            type="number"
                                            {...register(`exercises.${index}.sets_config.${setIdx}.count`)}
                                            id={`exercise-${index}-set-${setIdx}-count`}
                                            className="bg-transparent text-sm font-bold text-white outline-none w-full border-b border-white/10 focus:border-primary pb-1"
                                        />
                                    </div>
                                    <div className="w-24 space-y-1">
                                        <label className="text-[8px] font-black text-gray-600 block uppercase">Reps</label>
                                        <input
                                            {...register(`exercises.${index}.sets_config.${setIdx}.reps`)}
                                            id={`exercise-${index}-set-${setIdx}-reps`}
                                            className="bg-transparent text-sm font-bold text-white outline-none w-full border-b border-white/10 focus:border-primary pb-1"
                                            placeholder="8-10"
                                        />
                                    </div>
                                    <button
                                        id={`exercise-${index}-set-${setIdx}-delete`}
                                        type="button"
                                        onClick={() => {
                                            if (setFields.length > 1) {
                                                removeSet(setIdx)
                                            } else {
                                                notify({
                                                    title: "Acao Nao Permitida",
                                                    message: "O exercicio deve ter pelo menos um bloco de series.",
                                                    type: "warning",
                                                })
                                            }
                                        }}
                                        className="text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex md:flex-col gap-2 justify-center">
                    <button
                        id={`exercise-${index}-duplicate`}
                        type="button"
                        onClick={duplicate}
                        className="p-3 rounded-2xl bg-white/5 text-gray-400 hover:bg-primary hover:text-white transition-all group/btn"
                        title="Duplicar"
                    >
                        <Copy className="w-5 h-5" />
                    </button>
                    <button
                        id={`exercise-${index}-delete`}
                        type="button"
                        onClick={() => remove(index)}
                        className="p-3 rounded-2xl bg-white/5 text-gray-400 hover:bg-red-500 hover:text-white transition-all group/btn"
                        title="Excluir"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
