export default function ConfirmDialog({ open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-2xl border px-4 py-2 text-sm font-medium">{cancelText}</button>
          <button onClick={onConfirm} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
