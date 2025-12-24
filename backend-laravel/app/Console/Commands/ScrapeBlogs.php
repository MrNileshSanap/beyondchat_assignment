<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeBlogs extends Command
{
    protected $signature = 'scrape:blogs';
    protected $description = 'Scrape BeyondChats blog articles';

    public function handle()
{
    // Base URL required to resolve relative links on the page
    $baseUrl = 'https://beyondchats.com';
    $html = Http::get($baseUrl . '/blogs/')->body();

    // Initialize relative URLs
    $crawler = new Crawler($html, $baseUrl);

    // Extract all anchor links from the page
    $links = $crawler->filter('a')->links();

    $validLinks = [];

    foreach ($links as $link) {
        $url = $link->getUri();

        if (
            str_starts_with($url, 'https://beyondchats.com/blogs/') &&
            !str_contains($url, 'whatsapp') &&
            !str_contains($url, 'facebook') &&
            !str_contains($url, 'twitter')
        ) {
            $validLinks[] = $url;
        }
    }

    $oldestFive = array_slice(array_unique($validLinks), -5);

    foreach ($oldestFive as $url) {

        $articleHtml = Http::get($url)->body();
        $articleCrawler = new Crawler($articleHtml, $url);

        $title = $articleCrawler->filter('h1')->count()
            ? $articleCrawler->filter('h1')->text()
            : 'Untitled';

        $content = $articleCrawler->filter('article')->count()
            ? $articleCrawler->filter('article')->text()
            : '';

        Article::firstOrCreate(
            ['source_url' => $url],
            [
                'title' => $title,
                'content' => $content,
                'version' => 'original'
            ]
        );
    }

    $this->info('Scraping done');
}

}
