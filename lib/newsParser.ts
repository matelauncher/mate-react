import cheerio from 'cheerio'

export interface Post { img: string, title: string, desc: string, link: string, date: string } 

export const parse = (html: string) => {
    const data: Post[] = []

    const $ = cheerio.load(html);

    $('article').each((_, elem) => {
        data.push({
            title: $(elem).find(".post-title a").text(),
            img: $(elem).find('a img').attr('data-src')!,
            desc: $(elem).find(`div[itemprop = 'articleBody']`).text(),
            link: $(elem).find("a.read-more").attr('href')!,
            date: $(elem).find(".entry-date").text()
        })
    });

    console.log('Parsed posts: ', data)

    return data
}