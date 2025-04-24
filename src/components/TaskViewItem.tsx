import { Task } from "@prisma/client";

interface Props {
  task: Task
  onEdit: () => void 
  onDelete: () => void
}

export default function TaskViewItem({ task, onEdit, onDelete }: Props) {
  return (
    <>
      <span className="text-lg font-medium">{task.title}</span>
      <div className="flex gap-2">
        <button onClick={onEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">編集</button>
        <button onClick={onEdit} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">削除</button> 
      </div>
    </>
  )
}
