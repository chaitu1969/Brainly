/* eslint-disable @typescript-eslint/no-explicit-any */
export function Input({
  placeholder,
  referance,
}: {
  placeholder: string;
  referance?: any;
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="m-1 rounded-md border px-4 py-2"
        ref={referance}
      />
    </div>
  );
}
