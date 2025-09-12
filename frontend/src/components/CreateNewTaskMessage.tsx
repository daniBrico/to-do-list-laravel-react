import classNames from 'classnames'

interface Props {
  textMessage: string
  displayMessage: boolean
  taskIsLoading: boolean
}

const CreateNewTaskMessage: React.FC<Props> = ({
  textMessage,
  displayMessage,
  taskIsLoading
}) => {
  return (
    <div className="absolute w-full pl-2">
      <p
        className={classNames(
          'translate-y-0 text-base text-zinc-300 opacity-0 transition-all duration-300 ease-in-out',
          {
            'translate-y-2 opacity-100': displayMessage && !taskIsLoading
          }
        )}
      >
        {textMessage}
      </p>
    </div>
  )
}

export default CreateNewTaskMessage
