import { getUrl } from '@aws-amplify/storage';
import { Photo } from '@/src/API';

export const getPhotoImageByPhoto = async (photo: Photo) => {
  let imageUrl = '';
  try {
    if (!photo.imagePath) {
      console.warn(`写真 "${photo.id}" のimagePathが設定されていません`);
      imageUrl = '/assets/images/default-photo-image.png';
    } else {
      const result = await getUrl({
        path: photo.imagePath,
      });
      imageUrl = (result as any).url.href;
    }
  } catch (e) {
    console.error(`写真 "${photo.id}" の画像URL取得に失敗:`, e);
    imageUrl = '/assets/images/default-photo-image.png';
  }
  return imageUrl;
};

export const getSummaryMarkdownByPhoto = async (photo: Photo) => {
  let summaryMarkdown = '';
  try {
    if (!photo.summaryPath) {
      console.warn(`写真 "${photo.id}" のsummaryPathが設定されていません`);
      summaryMarkdown = '';
    } else {
      const result = await getUrl({
        path: photo.summaryPath,
      });
      summaryMarkdown = (result as any).url.href;
    }
  } catch (e) {
    console.error(`写真 "${photo.id}" のsummaryPath取得に失敗:`, e);
    summaryMarkdown = '';
  }
  return summaryMarkdown;
};
