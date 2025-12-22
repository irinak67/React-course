import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <h2>Error: {message}</h2>
    </div>
  );
};
