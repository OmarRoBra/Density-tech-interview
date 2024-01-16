import axios from "axios";
import { MainDiv } from "./comment.styled";

const url = import.meta.env.VITE_API_URL;

interface commentInterface {
  id: string;
  email: string;
  comment: string;
  onEdit: Function;
  onDelete: Function;
}

function comment({ commentProp }: { commentProp: commentInterface }) {
  const { email, comment, onDelete, onEdit, id } = commentProp;
  return (
    <MainDiv>
      <h3>{email}</h3>
      <p>{comment}</p>
      <div>
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={() => onEdit(id)}>Edit</button>
      </div>
    </MainDiv>
  );
}

export default comment;
