"use client";
import useUser from "@/hooks/useUser";
// import { useCompletion } from "ai/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Button from "../common/Button";
import useArticle from "@/hooks/useArticle";
import useDebounce from "@/hooks/useDebounce";
import { supabase } from "@/config/supabase";

interface props {
  id: string;
}

export default function Editor({ id }: props) {
  const { user } = useUser();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [topic, setTopic] = useState("");
  const [trackNewValue, setTrackNewValue] = useState("");
  const { articleById, addArticleLoading, addArticle, isSuccess } =
    useArticle(id);

  useEffect(() => {
    if (articleById) {
      setTopic(articleById?.topic);
      setValue(articleById?.content as string);
      setTrackNewValue(articleById?.content as string);
    }
  }, [articleById]);

  useDebounce(
    () => {
      if (id && trackNewValue) {
        addArticle({ value, user_id: user?.id, topic, id });
      }
    },
    2000,
    [value, user?.id, topic]
  );

  const handleAddArticle = async () => {
    addArticle({ value, user_id: user?.id, topic, id });
  };

  const handleInserts = (payload: any) => {
    setValue(payload?.new?.content);
  };

  supabase
    .channel("article")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "article",
        filter: `id=eq.${id}`,
      },
      handleInserts
    )
    .subscribe();

  return (
    <div className="mt-20 h-screen px-3">
      <div className="space-y-8 max-w-[800px] mx-auto">
        <div className="space-y-2 ">
          <div className="fc gap-1" onClick={() => router.back()}>
            <Back /> <p>Back</p>
          </div>

          <div className="!mt-8">
            <input
              type="text"
              value={topic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTopic(e.target.value)
              }
              placeholder="topic"
              className="primary-input "
            />
          </div>

          <div>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="!h-full"
              style={{ height: "100%" }}
            />

            <div className="text-gray-500 text-xs italic mt-2">
              {addArticleLoading && <p>saving...</p>}
              {isSuccess && <p>saved</p>}
            </div>
          </div>
        </div>

        {!articleById && (
          <div className="fcc gap-6 pt-8">
            <Button
              onClick={handleAddArticle}
              buttonText="Add Article"
              disabled={trackNewValue?.length === value?.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// const channel = supabase.channel("room1");

// channel
// channel
//   .on("broadcast", { event: "cursor-pos" }, (payload) => {
//     console.log("Cursor position received!", payload);
//   })
//   .subscribe((status) => {
//     if (status === "SUBSCRIBED") {
//       channel.send({
//         type: "broadcast",
//         event: "cursor-pos",
//         payload: { x: Math.random(), y: Math.random() },
//       });
//     }
//   });

// const { completion, input, handleInputChange, handleSubmit, isLoading } =
//   useCompletion({
//     api: "/api/completion",
//   });

const Back = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <path
        d="M13 5.93 6.93 12 13 18.07l1.5-1.5L9.93 12l4.57-4.57-1.5-1.5z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#000",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1.65 0 0 1.65 -5.672 -7.8)"
      />
    </svg>
  );
};
