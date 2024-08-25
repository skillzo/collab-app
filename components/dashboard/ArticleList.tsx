"use client";

import React from "react";
import Link from "next/link";
import useArticle from "@/hooks/useArticle";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import useUser from "@/hooks/useUser";

dayjs.extend(relativeTime);
export default function ArticleList() {
  const { articleData, articleDataLoading } = useArticle();
  const { user } = useUser();

  return (
    <div>
      <div className="fbc border-y py-3">
        <p className="font-semibold">Create Public Note</p>

        <Link
          href={user?.id ? "/editor" : "/auth/signin"}
          className="fc gap-1 primary-button"
        >
          <span>Create</span>
          {!user?.id && <LockIcon />}
        </Link>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {articleData?.map((a) => (
          <List a={a} key={a?.id} />
        ))}
      </ul>

      {articleDataLoading &&
        Array(4)
          .fill(null)
          .map((i, idx) => <ListLoader key={idx} />)}
    </div>
  );
}

const List = ({ a }: any) => {
  return (
    <li key={a?.email} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="fcc h-12 w-12 flex-none rounded-full bg-purple-500 text-white text-2xl">
          {a?.users?.email?.charAt(0)}
        </div>

        <div className="min-w-0 flex-auto">
          <Link href={`/${a?.id}`}>
            <p className="text-sm font-semibold leading-6 text-gray-900 hover:underline cursor-pointer ">
              {stripHtmlTags(a?.content?.slice(0, 150))}
            </p>
          </Link>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {a?.users?.email}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{a?.topic}</p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          Last updated{" "}
          <time dateTime={a?.updated_at}>{dayjs(a?.updated_at).fromNow()}</time>
        </p>
      </div>
    </li>
  );
};

const ListLoader = ({ a }: any) => {
  return (
    <li key={a?.email} className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4 w-full">
        <div className="skeleton fcc h-12 w-12 flex-none rounded-full text-white text-xl" />

        <div className="min-w-0 flex-auto w-full">
          <div className="space-y-2">
            <p className="skeleton h-4 w-full"></p>
            <p className="skeleton h-4 w-full"></p>
            <p className="skeleton h-4 w-full"></p>
          </div>

          <p className="skeleton h-4 w-40 mt-2"></p>
        </div>
      </div>

      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="skeleton h-4 w-full">{a?.topic}</p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          Last updated <time className="skeleton h-4 w-full"></time>
        </p>
      </div>
    </li>
  );
};

const LockIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <path
        d="M12 1C8.676 1 6 3.676 6 7v1c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v1H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "white",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(.95 0 0 .95 .6 1.075)"
      />
    </svg>
  );
};
