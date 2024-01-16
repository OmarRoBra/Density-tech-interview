import { useEffect, useState } from "react";
import Comment from "./components/comment";
import "./App.css";
import axios from "axios";

interface commentInterface {
  id?: string;
  email: string;
  comment: string;
}

const url = import.meta.env.VITE_API_URL;

function App() {
  const [newComment, setNewComment] = useState<commentInterface>();
  const [editComment, setEditComment] = useState(false);
  const [commnetState, setCommentState] = useState<Array<commentInterface>>([]);
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    console.log(url);
    axios
      .get(`${url}comment`)
      .then(function (response) {
        // handle success
        setCommentState(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  const onSubmit = () => {
    axios.post(`${url}comment`, newComment).then(function (response) {
      // handle success
      setNewComment({ email: "", comment: "" });
      console.log(response.data);
      setCommentState([...commnetState, response.data]);
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewComment((prevNewComment: any) => ({
      ...prevNewComment,
      [name]: value,
    }));
  };

  const onDelete = (id: string) => {
    axios.delete(`${url}comment/${id}`).then(function (response) {
      let newState = commnetState.filter((comment) => comment.id !== id);
      setCommentState(newState);
    });
  };

  const onEdit = (id: string) => {
    let commentToEdit = commnetState.find(
      (comment: commentInterface) => comment.id === id
    );
    setNewComment(commentToEdit);
    setEditComment(true);
  };

  const onSaveEdit = () => {
    axios
      .put(`${url}comment/${newComment?.id}`, newComment)
      .then(function (response) {
        // handle success
        setNewComment({ email: "", comment: "" });
        console.log(response.data);
        setCommentState([...commnetState, response.data]);
        setEditComment(false);
      });
  };

  return (
    <div className="main-div">
      <h1>Leave comments</h1>
      <input
        placeholder="Email"
        name="email"
        type="email"
        pattern=".+@example\.com"
        onChange={handleChange}
        value={newComment?.email}
      />
      <textarea
        placeholder="add a comment"
        onChange={handleChange}
        name="comment"
        value={newComment?.comment}
      />
      {!editComment ? (
        <button onClick={onSubmit}>Comment</button>
      ) : (
        <button onClick={onSaveEdit}>Save</button>
      )}

      {commnetState?.map((commentElement: commentInterface) => (
        <Comment
          commentProp={{
            email: commentElement.email,
            comment: commentElement.comment,
            id: commentElement.id as string,
            onDelete,
            onEdit,
          }}
        />
      ))}
    </div>
  );
}

export default App;
