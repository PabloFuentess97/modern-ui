import React, { useState, useEffect } from "react";

import { IArticle } from "models/user/IArticle";
import { useHistory, useParams } from "react-router-dom";
import { getArticleById, getUserById } from "api/fakeApi";
import moment from "moment";

import NewsComment from "components/NewsComment";
import MainLayout from "components/layout/MainLayout";
import ProfilePicture from "components/shared/ProfilePicture";
import HovercraftSpinner from "components/shared/spinners/HovercraftSpinner";
import { IUser } from "models/user/IUser";
import { IArticleComment } from "models/user/IArticleComment";

const NewsArticle = () => {
  const history = useHistory();
  const { articleId } = useParams();

  /**
   * Control view (article/comments).
   */
  type ViewKeys = "ARTICLE" | "COMMENTS";
  interface IViews {
    name: string;
    key: ViewKeys;
  }

  const views: IViews[] = [
    { name: "Article", key: "ARTICLE" },
    { name: "Comments", key: "COMMENTS" }
  ];

  const [currentView, setCurrentView] = useState<ViewKeys>("ARTICLE");

  /**
   * Fetching and api stuff.
   */
  const [articleLoading, setArticleLoading] = useState(true);
  const [article, setArticle] = useState<IArticle>();

  const [authorLoading, setAuthorLoading] = useState(true);
  const [author, setAuthor] = useState<IUser>();

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComemnts] = useState<IArticleComment[]>();

  useEffect(() => {
    (async () => {
      const fArticle = await getArticleById(parseInt(articleId || "0"));
      setArticle(fArticle);
      setArticleLoading(false);

      if (!fArticle) return;

      const fAuthor = await getUserById(fArticle.created_by);
      setAuthor(fAuthor);
      setAuthorLoading(false);
    })();
  }, [articleId]);

  // Show spinner if article data is loading.
  if (articleLoading) {
    return <HovercraftSpinner />;
  }

  // Return if something went wrong.
  if (!article) return <>"could not find article!"</>;

  return (
    <MainLayout>
      <div
        className="w-full h-40 flex flex-col justify-between bg-center border-b-2 dark:border-gray-800 border-gray-400"
        style={{
          backgroundImage: `url(/assets/images/news_images/${article.image})`
        }}
      >
        <div className="flex justify-between text-white p-2">
          <div>
            <button onClick={() => history.goBack()} className="h-8 w-8">
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>
          <div className="flex"></div>
        </div>
        <div className="flex flex-col p-4">
          <h1 className="text-white text-2xl font-semibold">{article.title}</h1>
          <span className="text-xs opacity-50 text-white">
            Events | {moment(article.created_at).calendar()}
          </span>
        </div>
      </div>

      <div className="flex justify-between rounded mx-2 my-1">
        {views.map(view => (
          <button
            className={`px-4 py-1 text-sm text-gray-500 w-1/2 rounded ${view.key ===
              currentView && "text-gray-500 bg-gray-400"}`}
            onClick={() => setCurrentView(view.key)}
          >
            {view.name}
          </button>
        ))}
      </div>

      {currentView === "ARTICLE" && (
        <>
          <div className="px-2">
            <div className=" my-2">
              <div className="w-full flex flex-wrap justify-between">
                <div className="flex">
                  <ProfilePicture
                    figure={author?.look}
                    online={author?.online}
                    styles="bg-gray-200"
                  />
                  <div className="flex flex-col leading-snug text-gray-700 px-2 self-center">
                    <span className="text-blue-700 text-sm font-semibold flex">
                      {author?.username}
                    </span>
                    <span className="text-gray-500 text-xs">Hotel Admin</span>
                  </div>
                </div>
                <div className="flex self-center"></div>
              </div>
            </div>

            <div className="text-gray-600 text-sm px-2 pt-2">
              {article.body}
            </div>
          </div>

          {/* <div className="hidden lg:block">
        <textarea
          className="w-full rounded border border-gray-400 text-xs p-1"
          placeholder="Write some comment..."
        ></textarea>
        <h4 className="text-gray-500 my-1 self-center text-xs font-semibold self-center">
          Comments ({comments.length})
        </h4>
        <div className="bg-white border border-gray-400 rounded dark:bg-gray-800 dark:border-gray-700">
          {comments.map(comment => (
            <NewsComment comment={comment} />
          ))}
        </div>
      </div> */}

          <div className="mt-2">
            <h4 className="text-gray-500 my-1 self-center text-xs font-semibold self-center">
              Other articles
            </h4>
          </div>
        </>
      )}
      {currentView === "COMMENTS" && <div>Comments</div>}
    </MainLayout>
  );
};

export default NewsArticle;
