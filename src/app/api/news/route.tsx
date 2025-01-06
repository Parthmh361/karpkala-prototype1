import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

interface NewsItem {
  title: string;
  link: string;
  source: string;
}

// Fetch Hindi News
const fetchHindiNews = async (): Promise<NewsItem[]> => {
  const url = "https://www.indiatv.in/paisa/topic/cotton";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const news: NewsItem[] = [];

  $(".bolly-news-listing a").each((_, el) => {
    const title = $(el).text().trim();
    const link = $(el).attr("href") || "";

    // Exclude "बिज़नेस" and empty titles
    if (title && !title.includes("बिज़नेस")) {
      news.push({
        title,
        link,
        source: "IndiaTV (Hindi)",
      });
    }
  });

  return news;
};

// Fetch Marathi News
const fetchMarathiNews = async (): Promise<NewsItem[]> => {
  const url = "https://www.lokmat.com/topics/cotton/new";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const news: NewsItem[] = [];

  $(".list-view figure a").each((_, el) => {
    const title = $(el).text().trim();
    const link = $(el).attr("href") || "";

    // Exclude "Read More" and "लोकमत शेती"
    if (
      title &&
      !title.includes("Read More") &&
      !title.includes("लोकमत शेती")
    ) {
      news.push({
        title,
        link,
        source: "Lokmat (Marathi)",
      });
    }
  });

  return news;
};

// Fetch Telugu News
const fetchTeluguNews = async (): Promise<NewsItem[]> => {
  const url = "https://www.sakshi.com/tags/cotton-price";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const news: NewsItem[] = [];

  $(".news_list_li").each((_, el) => {
    const title = $(el).find(".news_title").text().trim();
    let link = $(el).find("a").attr("href") || "";

    // Resolve the relative URL to an absolute URL
    if (link.startsWith("/")) {
      link = `https://www.sakshi.com${link}`;
    }

    if (title) {
      news.push({
        title,
        link,
        source: "Sakshi (Telugu)",
      });
    }
  });

  return news;
};


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");

  let news: NewsItem[] = [];
  try {
    if (lang === "hindi") news = await fetchHindiNews();
    else if (lang === "marathi") news = await fetchMarathiNews();
    else if (lang === "telugu") news = await fetchTeluguNews();
    else
      return NextResponse.json(
        { error: "Invalid language selected" },
        { status: 400 }
      );

    return NextResponse.json(news);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
