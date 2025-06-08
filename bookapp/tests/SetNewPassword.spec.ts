import { test, expect } from '@playwright/test';

test.describe('SetNewPassword Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/api/auth/settingNewPassword', async route => {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true })
            });
        });

        await page.goto('/setNewPass?NewPass=&ReNewPass=', {
            waitUntil: 'domcontentloaded'
        });

        await page.evaluate(() => {
            history.replaceState({ email: 'test@example.com' }, '', '/setNewPass?NewPass=&ReNewPass=');
        });
    });

    test('نمایش صحیح فیلدها و دکمه', async ({ page }) => {
        await expect(page.locator('#NewPass')).toBeVisible();
        await expect(page.locator('#ReNewPass')).toBeVisible();
        await expect(page.getByRole('button', { name: 'ثبت' })).toBeVisible();
    });

    test('خطا در صورت عدم تطابق رمزها', async ({ page }) => {
        await page.fill('#NewPass', '12345678');
        await page.fill('#ReNewPass', '87654321');
        await page.click('button:has-text("ثبت")');
        const errorToast = page.getByTestId('error-toast');
        await expect(errorToast).toBeVisible({ timeout: 5000 });
        await expect(errorToast).toContainText('رمز عبور جدید و تکرار آن یکسان نیستند');
    });

    test('موفقیت در ثبت رمز عبور و انتقال به صفحه لاگین', async ({ page }) => {
        await page.fill('#NewPass', '12345678');
        await page.fill('#ReNewPass', '12345678');

        await page.route('**/login', async route => {
            return route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<html><body>Login Page</body></html>'
            });
        });

        await page.click('button:has-text("ثبت")');

        const successToast = page.getByTestId('success-toast');
        await expect(successToast).toBeVisible({ timeout: 5000 });
        await expect(successToast).toContainText('رمز عبور با موفقیت تغییر کرد');

        await expect(page).toHaveURL(/.*login.*/, { timeout: 5000 });
    });
});