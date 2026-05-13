import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!title.trim() || !content.trim()) {
    //   toast.error("All fields are required");
    // }

    setIsLoading(true);

    try {
      await axios.post("http://192.168.68.123:5001/api/notes", { title, content });
      toast.success("Note Created Successfully!");
      navigator("/");
      // setIsLoading(false);
    } catch (error) {
      console.log("Error in creating note", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! you are creating notes too fast!", {
          duration: 4000,
          icon: '⚠️'
        });
      } else toast.error("Something went wrong while creating the note!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6 ">
            <ArrowLeft className="six-5" />
            <span>Back to notes</span>
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  {/* Title */}
                  <div className="flex flex-col my-4">
                    <label className="lable mb-2">
                      <span className="lable-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="note title"
                      className="input input-bordered"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col my-4">
                    <label className="lable mb-2">
                      <span className="lable-text">Content</span>
                    </label>
                    <textarea
                      placeholder="write your note content here..."
                      className="textarea textarea-bordered h-32"
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                  </div>

                  {/* submit button */}
                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating ..." : "Create Note"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
