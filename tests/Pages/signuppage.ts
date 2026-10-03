import { Page, Locator } from '@playwright/test';

// https://www.facebook.com/reg/

export class SignupPage {
    private readonly page: Page;

    private readonly createAccountButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly dayDropdown: Locator;
    private readonly monthDropdown: Locator;
    private readonly yearDropdown: Locator;
    private readonly genderRadioButton: Locator;
    private readonly mobileNumberInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.createAccountButton = page.getByRole('button', {
            name: 'Create new account'
        });

        this.firstNameInput = page.locator('input[name="firstname"]');

        this.lastNameInput = page.locator('input[name="lastname"]');

        this.dayDropdown = page.locator('select[name="birthday_day"]');

        this.monthDropdown = page.locator('select[name="birthday_month"]');

        this.yearDropdown = page.locator('select[name="birthday_year"]');

        // Facebook has multiple gender radio buttons.
        this.genderRadioButton = page.locator('input[name="sex"]');

        this.mobileNumberInput = page.locator('input[name="reg_email__"]');

        this.passwordInput = page.locator('input[name="reg_passwd__"]');

        this.submitButton = page.getByRole('button', {
            name: 'Sign Up'
        });
    }

    async clickCreateAccountButton(): Promise<void> {
        await this.createAccountButton.click();
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async selectDay(day: string): Promise<void> {
        await this.dayDropdown.selectOption(day);
    }

    async selectMonth(month: string): Promise<void> {
        await this.monthDropdown.selectOption(month);
    }

    async selectYear(year: string): Promise<void> {
        await this.yearDropdown.selectOption(year);
    }

    async selectGender(gender: string): Promise<void> {
        await this.genderRadioButton
            .locator(`xpath=..`)
            .filter({ hasText: gender })
            .locator('input[name="sex"]')
            .check();
    }

    async enterMobileNumber(mobileNumber: string): Promise<void> {
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }
}