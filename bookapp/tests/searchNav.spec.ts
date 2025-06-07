import { test, expect } from '@playwright/test';

test.describe('SearchNav Component', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/Homepage'); // or wherever SearchNav is rendered
    });

    test('should toggle the drawer menu', async ({ page }) => {
        await page.getByAltText('menu').click();

        await expect(page.getByText(/^حساب کاربری$/)).toBeVisible();

        await page.locator('[class*=overlay]').click();


    });

    test('should show login link if no token', async ({ page }) => {
        await expect(page.getByText('ورود | ثبت‌نام')).toBeVisible();
    });

    test('should search for a book and show results', async ({ page }) => {
        // Intercept and mock the search API
        await page.route('**/api/book/searchurl/**', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    updatedBookData: [
                        { bookid: '1', title: 'React Basics', fullauthorname: 'John Doe', imageurl: 'image1.png' }
                    ]
                }),
            })
        );

        await page.getByPlaceholder('جستجو').fill('React');
        await page.waitForTimeout(400); // wait for debounce

        await expect(page.getByText('React Basics')).toBeVisible();
        await expect(page.getByText('John Doe')).toBeVisible();
    });

    test('should show no result message', async ({ page }) => {
        await page.route('**/api/book/searchurl/**', route =>
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ updatedBookData: [] }),
            })
        );

        await page.getByPlaceholder('جستجو').fill('UnknownBook');
        await page.waitForTimeout(400);

        await expect(page.getByText('نتیجه‌ای یافت نشد')).toBeVisible();
    });

    test('should open and close logout confirmation modal', async ({ page }) => {
        await page.getByAltText('menu').click();
        await page.getByText('خروج از حساب کاربری').click();

        await expect(page.getByText('واقعاً مطمئنی که می‌خوای بری؟')).toBeVisible();

        await page.getByText('نه فعلا').click();
        await expect(page.getByText('واقعاً مطمئنی که می‌خوای بری؟')).toBeHidden();
    });

});
