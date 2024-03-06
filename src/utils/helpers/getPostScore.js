export const getPostScore = post => {
  try {
    const VIEW = 1;
    const CLAP = 2;
    const COMMENT = 3;
    const SHARE = 4;

    const {
      claps = 0,
      comment_count_for_score = 0,
      view_count = 0,
      share_count = 0,
    } = post;

    const postScrore =
      claps * CLAP +
      comment_count_for_score * COMMENT +
      share_count * SHARE +
      view_count * VIEW;

    return postScrore;
  } catch (e) {
    return 0;
  }
};
