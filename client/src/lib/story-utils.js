import moment from 'moment';

export const getStoryDate = story => {
  return moment(story.publishedAt).format('MMMM D, YYYY');
}
