const TagLabel = ({text,className = "",}) => {
  return (
    <p className={`font-semibold px-4 py-2 rounded-lg bg-[rgba(187,255,204,0.3)] border border-2 border-[rgba(32,255,87,0.62)] ${className}`}>
      {text}
    </p>
  )
}

export default TagLabel;