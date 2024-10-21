import axios from "axios";
import { BASE_URL } from "~/common/api";

const TAG_BLOG_KEY = {
   TAG_ALL: "tag_all",
};

const getTagBlogs = async (page: number = 1) => {
   return await axios
      .get(BASE_URL + `/blog-tags?page=${page}`)
      .then((res) => res.data);
};

export { getTagBlogs, TAG_BLOG_KEY };
