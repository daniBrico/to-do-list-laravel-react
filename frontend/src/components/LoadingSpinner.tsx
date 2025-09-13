interface LoadingSpinnerProps {
  isLoading: boolean
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading
}) => {
  return (
    <>
      {isLoading && (
        <div className="h-full w-full animate-spin rounded-full border-3 border-solid border-transparent border-t-zinc-600 border-r-zinc-600" />
      )}
    </>
  )
}
