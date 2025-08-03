import { expect, test } from '@playwright/test';

// Mock 數據
const mockMovies = [
  {
    adult: false,
    backdrop_path: '/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg',
    genre_ids: [878, 53],
    id: 755898,
    original_language: 'en',
    original_title: 'War of the Worlds',
    overview:
      '一場龐大的入侵即將來臨，伴隨而來的是對同名傳奇小說的全新演繹。著名女演員伊娃・朗格莉亞聯同傳奇饒舌歌手兼演員冰塊酷巴，以及米高・奧尼爾與伊曼・賓森，展開一場驚心動魄、超越現實的歷險旅程，當中充滿與現代息息相關的科技、監控與私隱議題。',
    popularity: 2175.1555,
    poster_path: '/yvirUYrva23IudARHn3mMGVxWqM.jpg',
    release_date: '2025-07-29',
    title: '世界大戰',
    video: false,
    vote_average: 4.491,
    vote_count: 109,
  },
  {
    adult: false,
    backdrop_path: '/8J6UlIFcU7eZfq9iCLbgc8Auklg.jpg',
    genre_ids: [14, 10751, 28],
    id: 1087192,
    original_language: 'en',
    original_title: 'How to Train Your Dragon',
    overview:
      '博克島上，維京人與龍族是世代相傳的宿敵，但小嗝嗝卻與眾不同。作為族長大塊頭史圖依克充滿創意卻不被重視的兒子，小嗝嗝打破數百年來的傳統，和一隻令人畏懼的夜煞－沒牙－成為好朋友，並建立出一段特別的友誼。當一個古老的威脅出現，小嗝嗝和沒牙的友情就成為創造一個全新未來的關鍵。',
    popularity: 558.9468,
    poster_path: '/4k0CHrBwyuhKeQfDZDH31863lTx.jpg',
    release_date: '2025-06-06',
    title: '馴龍高手',
    video: false,
    vote_average: 8.043,
    vote_count: 1411,
  },
  {
    adult: false,
    backdrop_path: '/1RgPyOhN4DRs225BGTlHJqCudII.jpg',
    genre_ids: [16, 28, 14, 53],
    id: 1311031,
    original_language: 'ja',
    original_title: '劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来',
    overview:
      '為了面對與鬼即將到來的決戰，竈門炭治郎和隊員們集體參加聯合強化訓練《柱訓練》。此時，鬼舞辻無慘卻出現在「鬼殺隊」的大本營產屋敷府。「柱」們與炭治郎在無慘的操縱之下落入了充滿謎團的空間，炭治郎等人落下的地方，正是鬼的大本營「無限城」──「鬼殺隊」與「鬼」的決戰，序幕就此揭開。',
    popularity: 501.4577,
    poster_path: '/ozfiVnEZUSGWhEl5VtdLdIe1nbt.jpg',
    release_date: '2025-07-18',
    title: '劇場版「鬼滅之刃」無限城篇 第一章 猗窩座再襲',
    video: false,
    vote_average: 7.155,
    vote_count: 55,
  },
  {
    adult: false,
    backdrop_path: '/shRevbFSTMZK0PheyYhZq135Kcr.jpg',
    genre_ids: [28, 27, 10749],
    id: 986206,
    original_language: 'en',
    original_title: 'Night Carnage',
    overview: '',
    popularity: 548.386,
    poster_path: '/gep8Mk0ndUn8IXyXouPz5cvIvzj.jpg',
    release_date: '2025-07-29',
    title: 'Night Carnage',
    video: false,
    vote_average: 4.0,
    vote_count: 4,
  },
  {
    adult: false,
    backdrop_path: '/6WqqEjiycNvDLjbEClM1zCwIbDD.jpg',
    genre_ids: [27, 53, 878],
    id: 1100988,
    original_language: 'en',
    original_title: '28 Years Later',
    overview:
      '自從致命的病毒從化學武器實驗室流出後，至今已經過了28年，在仍舊嚴格的隔離政策下，人類漸漸找到與感染者共存的生存方式。其中一群生還者，生活在一座有戒備森嚴單一出入口的離島，但是當他們被迫離開家園深入黑暗的外界時，將發現令感染者和生還者突變的駭人秘密。',
    popularity: 418.0824,
    poster_path: '/ngCMM9huOFd1MhLUv3YJGhKMUSf.jpg',
    release_date: '2025-06-18',
    title: '28年毀滅倒數',
    video: false,
    vote_average: 7.0,
    vote_count: 831,
  },
  {
    adult: false,
    backdrop_path: '/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg',
    genre_ids: [10751, 878, 35, 12],
    id: 552524,
    original_language: 'en',
    original_title: 'Lilo & Stitch',
    overview:
      '因家庭破碎而深感孤單的夏威夷「人類小女孩」莉蘿，與逃離邪惡主人並降臨地球的藍色外星人、卻有酷似無尾熊超可愛外表的史迪奇一拍即合，除了鬧出一連串與地球格格不入的笑話，也在彼此身上找到前所未有的友情與依靠，爆笑又感人的故事十分引人入勝！',
    popularity: 356.3146,
    poster_path: '/dpEWJUvwpYAX1YFvoyzOfsikIGq.jpg',
    release_date: '2025-05-17',
    title: '星際寶貝：史迪奇',
    video: false,
    vote_average: 7.334,
    vote_count: 1223,
  },
  {
    adult: false,
    backdrop_path: '/x5dVPttNDZaVRTvbk7pYrtGZoZN.jpg',
    genre_ids: [35],
    id: 1263256,
    original_language: 'en',
    original_title: 'Happy Gilmore 2',
    overview:
      '哈皮吉爾摩還沒放棄高爾夫，他會繼續揮長桿！亞當山德勒的傳奇火爆角色回來了，這次他要幫助小孩完成夢想。',
    popularity: 349.661,
    poster_path: '/6dYAxnwRQNdXILx621xdX61fJJB.jpg',
    release_date: '2025-07-25',
    title: '高爾夫球也瘋狂 2',
    video: false,
    vote_average: 6.741,
    vote_count: 406,
  },
  {
    adult: false,
    backdrop_path: '/cEQMqB3ahd4mfeUN6VGC0ouVnZZ.jpg',
    genre_ids: [28, 878, 53],
    id: 1071585,
    original_language: 'en',
    original_title: 'M3GAN 2.0',
    overview:
      '在人工智慧人形機器人梅根遭到摧毀的兩年後，梅根的核心技術被一家勢力強大的國防承包商濫用，打造出一款名為艾蜜莉亞的終極殺戮型人形機器人。隨著艾蜜莉亞的自我意識逐漸覺醒，她對於服從人類命令的興趣變得越來越低，甚至開始覺得人類不應該存在。潔瑪意識到唯一的選擇就是讓梅根復活，並且為她進行全面升級...',
    popularity: 351.935,
    poster_path: '/lQXDRQUxfkoABXh03eadAr1C8H7.jpg',
    release_date: '2025-06-25',
    title: '窒友梅根2.0',
    video: false,
    vote_average: 7.687,
    vote_count: 580,
  },
];

const mockGenres = [
  {
    id: 28,
    name: '动作',
  },
  {
    id: 12,
    name: '冒险',
  },
  {
    id: 16,
    name: '动画',
  },
  {
    id: 35,
    name: '喜剧',
  },
  {
    id: 80,
    name: '犯罪',
  },
  {
    id: 99,
    name: '纪录',
  },
  {
    id: 18,
    name: '剧情',
  },
  {
    id: 10751,
    name: '家庭',
  },
  {
    id: 14,
    name: '奇幻',
  },
  {
    id: 36,
    name: '历史',
  },
  {
    id: 27,
    name: '恐怖',
  },
  {
    id: 10402,
    name: '音乐',
  },
  {
    id: 9648,
    name: '悬疑',
  },
  {
    id: 10749,
    name: '爱情',
  },
  {
    id: 878,
    name: '科幻',
  },
  {
    id: 10770,
    name: '电视电影',
  },
  {
    id: 53,
    name: '惊悚',
  },
  {
    id: 10752,
    name: '战争',
  },
  {
    id: 37,
    name: '西部',
  },
];

test.describe('MovieListPage E2E 測試', () => {
  test.beforeEach(async ({ page }) => {
    // 設置 API 攔截
    await page.route('**/movie/popular**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: mockMovies,
          page: 1,
          total_pages: 1,
          total_results: mockMovies.length,
        }),
      });
    });

    await page.route('**/genre/movie/list**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          genres: mockGenres,
        }),
      });
    });

    // 攔截所有可能的 API 請求
    await page.route('**/movie/**', async route => {
      const url = route.request().url();

      if (url.includes('popular')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            results: mockMovies,
            page: 1,
            total_pages: 1,
            total_results: mockMovies.length,
          }),
        });
      } else {
        // 對於其他電影 API，返回空結果
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            results: [],
            page: 1,
            total_pages: 1,
            total_results: 0,
          }),
        });
      }
    });

    // 攔截所有可能的 genres 請求
    await page.route('**/genre/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          genres: mockGenres,
        }),
      });
    });

    // 導航到電影列表頁面
    await page.goto('/#/movie-list');

    // 等待頁面載入完成
    await page.waitForLoadState('networkidle');

    // 等待載入指示器出現（如果有的話）
    try {
      await page.waitForSelector('[data-testid="loading-indicator"]', { timeout: 5000 });
      // 等待載入指示器消失
      await page.waitForSelector('[data-testid="loading-indicator"]', {
        state: 'hidden',
        timeout: 10000,
      });
    } catch (e) {
      // 如果沒有載入指示器，直接繼續
    }

    // 等待電影列表出現並確保它是可見的
    await page.waitForSelector('[data-testid="movie-list"]', { timeout: 15000 });

    // 檢查頁面狀態
    const loadingIndicator = page.locator('[data-testid="loading-indicator"]');
    const errorState = page.locator('[data-testid="error-state"]');

    // 如果還在載入，等待載入完成
    if (await loadingIndicator.isVisible()) {
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }

    // 檢查是否有錯誤狀態
    if (await errorState.isVisible()) {
      throw new Error('Page is in error state');
    }

    // 確保電影列表是可見的
    await expect(page.getByTestId('movie-list')).toBeVisible();

    // 等待電影卡片載入
    await page.waitForSelector('[data-testid^="movie-card-"]', { timeout: 10000 });
  });

  test('movie-list-1-載入電影列表頁面', async ({ page }) => {
    // 驗證頁面標題
    await expect(page.getByText('熱門電影')).toBeVisible();

    // 驗證電影卡片存在
    const movieCards = page.locator('[data-testid^="movie-card-"]');
    await expect(movieCards).toHaveCount(8); // 應該有 8 個 mock 電影

    // 驗證搜尋框存在
    await expect(page.getByTestId('search-input')).toBeVisible();

    // 驗證篩選器存在
    // 桌面版顯示「篩選條件」，手機版顯示「篩選」按鈕
    const filterTitle = page.getByText('篩選條件');
    const filterButton = page.getByTestId('filter-button');

    // 檢查桌面版或手機版的篩選器是否存在
    const hasDesktopFilter = await filterTitle.isVisible();
    const hasMobileFilter = await filterButton.isVisible();

    // 至少其中一個應該可見
    expect(hasDesktopFilter || hasMobileFilter).toBe(true);

    // 等待 genres 載入
    await page.waitForTimeout(2000);

    // 檢查是否有 genres 按鈕（除了「全部類型」）
    const genreButtons = page.locator('[data-testid^="genre-checkbox-"]');
    const genreButtonCount = await genreButtons.count();

    // 應該至少有幾個 genre 按鈕
    expect(genreButtonCount).toBeGreaterThan(10);
  });

  test('movie-list-2-執行搜尋功能', async ({ page }) => {
    // 設置搜尋 API 攔截
    await page.route('**/search/movie**', async route => {
      const url = route.request().url();
      const searchQuery = new URL(url).searchParams.get('query');

      if (searchQuery?.includes('世界大戰')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            results: [mockMovies[0]], // 只返回世界大戰
            page: 1,
            total_pages: 1,
            total_results: 1,
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            results: [],
            page: 1,
            total_pages: 1,
            total_results: 0,
          }),
        });
      }
    });

    // 在搜尋框中輸入搜尋詞
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('世界大戰');
    await searchInput.press('Enter');

    // 等待搜尋結果載入
    await page.waitForTimeout(1000);

    // 驗證搜尋結果
    const movieCards = page.locator('[data-testid^="movie-card-"]');
    await expect(movieCards).toHaveCount(1);

    // 驗證搜尋結果包含搜尋詞
    const firstMovieTitle = page
      .locator('[data-testid^="movie-card-"]')
      .first()
      .locator('[data-testid="movie-title"]');
    await expect(firstMovieTitle).toContainText('世界大戰');
  });

  test('movie-list-3-處理空搜尋結果', async ({ page }) => {
    // 設置空搜尋結果
    await page.route('**/search/movie**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [],
          page: 1,
          total_pages: 1,
          total_results: 0,
        }),
      });
    });

    // 搜尋一個不存在的電影
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('NonExistentMovie12345');
    await searchInput.press('Enter');

    await page.waitForTimeout(1000);

    // 驗證沒有電影卡片顯示
    const movieCards = page.locator('[data-testid^="movie-card-"]');
    await expect(movieCards).toHaveCount(0);
  });

  test('movie-list-4-桌面版篩選功能', async ({ page }) => {
    // 設置為桌面版視窗大小
    await page.setViewportSize({ width: 1200, height: 800 });

    // 選擇動作類型（在桌面版側邊欄）
    const actionGenreCheckbox = page.getByTestId('genre-checkbox-28');
    await actionGenreCheckbox.click();

    // 選擇排序方式（在桌面版側邊欄）
    const sortSelect = page.getByTestId('sort-select');
    await sortSelect.selectOption('popularity.desc');

    // 點擊篩選器中的搜尋按鈕應用篩選
    const filterSearchButton = page.getByTestId('filter-search-button');
    await filterSearchButton.click();

    // 驗證篩選結果
    const movieCards = page.locator('[data-testid^="movie-card-"]');
    await expect(movieCards).toHaveCount(4); // 有 Action 類型的電影
  });

  test('movie-list-5-手機版篩選功能', async ({ page }) => {
    // 設置為手機版視窗大小
    await page.setViewportSize({ width: 375, height: 667 });

    // 點擊篩選按鈕（在手機版顯示）
    const filterButton = page.getByTestId('filter-button');
    await filterButton.click();

    // 驗證篩選模態框出現
    await expect(page.getByTestId('filter-modal')).toBeVisible();

    // 選擇動作類型（在模態框中）
    const actionGenreCheckbox = page.getByTestId('filter-modal').getByTestId('genre-checkbox-28');
    await actionGenreCheckbox.click();

    // 選擇排序方式（在模態框中）
    const sortSelect = page.getByTestId('filter-modal').getByTestId('sort-select');
    await sortSelect.selectOption('popularity.desc');

    // 應用篩選
    const applyFilterButton = page.getByTestId('apply-filter-button');
    await applyFilterButton.click();

    // 驗證篩選模態框關閉
    await expect(page.getByTestId('filter-modal')).not.toBeVisible();

    // 驗證篩選結果
    const movieCards = page.locator('[data-testid^="movie-card-"]');
    await expect(movieCards).toHaveCount(4); // 有 Action 類型的電影
  });

  test('movie-list-6-執行收藏功能', async ({ page }) => {
    // 點擊第一個電影的收藏按鈕
    const firstMovieHeart = page
      .locator('[data-testid^="movie-card-"]')
      .first()
      .locator('[data-testid^="heart-"]');
    await firstMovieHeart.click();

    // 驗證收藏按鈕狀態改變
    await expect(firstMovieHeart).toHaveAttribute('data-liked', 'true');

    // 再次點擊取消收藏
    await firstMovieHeart.click();

    // 驗證收藏按鈕狀態恢復
    await expect(firstMovieHeart).toHaveAttribute('data-liked', 'false');
  });
});
