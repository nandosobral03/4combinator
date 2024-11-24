export const fetchCatalog = async (
  board: string,
): Promise<Catalog[] | null> => {
  try {
    const response = await fetch(`https://a.4cdn.org/${board}/catalog.json`);
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as Catalog[];
    return data;
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return null;
  }
};

export type Catalog = {
  page: number;
  threads: Thread[];
};

export type Thread = {
  no: number;
  resto: number;
  sticky?: number;
  closed?: number;
  now: string;
  time: number;
  name: string;
  trip?: string;
  id?: string;
  capcode?: string;
  country?: string;
  country_name?: string;
  sub?: string;
  com?: string;
  tim?: number;
  filename?: string;
  ext?: string;
  fsize?: number;
  md5?: string;
  w?: number;
  h?: number;
  tn_w?: number;
  tn_h?: number;
  filedeleted?: number;
  spoiler?: number;
  custom_spoiler?: number;
  omitted_posts?: number;
  omitted_images?: number;
  replies: number;
  images: number;
  bumplimit?: number;
  imagelimit?: number;
  last_modified: number;
  tag?: string;
  semantic_url: string;
  since4pass?: number;
  unique_ips?: number;
  m_img?: number;
  last_replies?: Reply[];
};

export type Reply = {
  no: number;
  resto: number;
  now: string;
  time: number;
  name: string;
  trip?: string;
  id?: string;
  capcode?: string;
  country?: string;
  country_name?: string;
  com?: string;
  tim?: number;
  filename?: string;
  ext?: string;
  fsize?: number;
  md5?: string;
  w?: number;
  h?: number;
  tn_w?: number;
  tn_h?: number;
  filedeleted?: number;
  spoiler?: number;
  custom_spoiler?: number;
  m_img?: number;
};
