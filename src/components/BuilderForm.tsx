interface BuilderFormProps {
  name: string;
  role: string;
  onNameChange: (name: string) => void;
  onRoleChange: (role: string) => void;
  onGenerate: () => void;
}

const BuilderForm = ({
  name,
  role,
  onNameChange,
  onRoleChange,
  onGenerate,
}: BuilderFormProps) => {
  const canGenerate = name.trim().length > 0 && role.trim().length > 0;

  return (
    <div className="builder-form">
      <div className="field">
        <label htmlFor="name">YOUR NAME</label>

        <input
          id="name"
          type="text"
          placeholder="e.g. Abir Singh Sharma"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          maxLength={40}
        />
      </div>

      <div className="field">
        <label htmlFor="role">STACK / ROLE</label>

        <input
          id="role"
          type="text"
          placeholder="e.g. AI / ML • Full Stack"
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
          maxLength={40}
        />
      </div>

      <button
        className="generate-id-button"
        onClick={onGenerate}
        disabled={!canGenerate}
      >
        GENERATE BUILDER ID
      </button>
    </div>
  );
};

export default BuilderForm;
