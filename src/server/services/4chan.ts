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
  threads: CatalogThread[];
};

// Base type with all shared properties
export type BaseThread = {
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
  tim?: Date;
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
  replies: number;
  images: number;
  bumplimit?: number;
  imagelimit?: number;
  tag?: string;
  semantic_url: string;
  since4pass?: number;
  unique_ips?: number;
  m_img?: number;
};

// Catalog-specific properties
export type CatalogThread = BaseThread & {
  omitted_posts?: number;
  omitted_images?: number;
  last_modified: number;
};

export const fetchThread = async (
  board: string,
  threadNo: number,
): Promise<{ posts: ThreadDetails[] } | null> => {
  try {
    const response = await fetch(
      `https://a.4cdn.org/${board}/thread/${threadNo}.json`,
    );
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { posts: ThreadDetails[] };
    return data;
  } catch (error) {
    console.error("Error fetching thread:", error);
    return null;
  }
};

// Thread details specific properties
export type ThreadDetails = BaseThread & {
  board_flag?: string;
  flag_name?: string;
  archived?: number;
  archived_on?: number;
};
