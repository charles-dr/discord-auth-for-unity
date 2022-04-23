import express from "express";
import request from "supertest";

import routes from "../index";

const app = express();

app.use("/", routes);

describe("Standard Level APIs", () => {
  it("GET /reverse-words", async () => {
    const response = await request(app)
      .get('/reverse-words')
      .query({
        sentence: "He asked me, 'How are you?'",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("eH deksa em, 'woH era uoy?'");
  });

  it("GET /sort-words", async () => {
    const response = await request(app)
      .get('/sort-words')
      .query({
        sentence: "He asked me, 'How are you?'",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("eH adeks em, 'How aer ouy?'");
  });
});

describe("Extended Level APIs", () => {
  type TaxBreakDown = {
    income: number,
    medicare: number,
    total: number,
  };
  type CalculatedPay = {
    baseSalary: number;
    superannuation: number;
    postTaxIncome: number;
    taxes: TaxBreakDown,
  };
  type TestCaseItem = {
    src: number;
    dest: CalculatedPay;
  };
  it("GET /calculate-after-tax-income", async () => {
    const testCases: Array<TestCaseItem> = [
      {
        src: 85000,
        dest: {
          baseSalary: 85000,
          superannuation: 8075,
          taxes: {
            income: 19172,
            medicare: 1700,
            total: 20872,
          },
          postTaxIncome: 64128,
        },
      },
    ];
    await Promise.all(testCases.map(async ({ src, dest }) => {
      const { body, statusCode } = await request(app)
        .get('/calculate-after-tax-income')
        .query({
          annualBaseSalary: src,
        });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(dest);
    }));
  });

  it("GET /calculate-pre-tax-income-from-take-home", async () => {
    const testCases: Array<TestCaseItem> = [
      {
        src: 64000,
        dest: {
          baseSalary: 84805,
          superannuation: 8056.48,
          taxes: {
              income: 19109,
              medicare: 1696.1,
              total: 20805
          },
          postTaxIncome: 64000,
        },
      },
    ];
    await Promise.all(testCases.map(async ({ src, dest }) => {
      const { body, statusCode } = await request(app)
        .get('/calculate-pre-tax-income-from-take-home')
        .query({
          postTaxSalary: src,
        });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(dest);
    }));
  });
});
