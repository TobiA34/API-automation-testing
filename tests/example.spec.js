// @ts-check
import { test, expect } from "@playwright/test";

test.describe("API Testing with Playwright", () => {
  let authToken;

  // Post
  test.beforeEach(async ({ request }) => {
    console.log("🔄 Authenticating user...");

    const response = await request.post("https://reqres.in/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: "eve.holt@reqres.in",  
        password: "cityslicka",
      },
    });

    console.log(`📡 Response Status: ${response.status()}`);

    expect(response.status()).toBe(200);
    const jsonData = await response.json();

    if (!jsonData.token) {
      throw new Error("❌ Token not found in response!");
    }

    authToken = jsonData.token;
    console.log("✅ Authentication successful! Token:", authToken);
  });

  //Get
  test("GET Users with Auth Token", async ({ request }) => {
    const response = await request.get("https://reqres.in/api/users?page=2", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    console.log("✅ Users Data:", body.data);
  });

  //Put
  test("PUT Request", async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "Updated Title", body: "Updated Body" }),
      }
    );

    expect(response.status).toBe(200);

    const jsonData = await response.json();
    expect(jsonData.title).toBe("Updated Title");
    expect(jsonData.body).toBe("Updated Body");
  });

  test("DELETE Request", async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "DELETE",
      }
    );
    expect(response.status).toBe(200);
  });

  // Invalid test case 1 Post
test.beforeEach(async ({ request }) => {
  console.log("🔄 Authenticating user...");

  const response = await request.post("https://reqres.in/api/login", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: "elko.holt@reqres.in",  
      password: "cityslicka",
    },
  });

  console.log(`📡 Response Status: ${response.status()}`);

  expect(response.status()).toBe(200);
  const jsonData = await response.json();

  if (!jsonData.token) {
    throw new Error("❌ Token not found in response!");
  }

  authToken = jsonData.token;
  console.log("✅ Authentication successful! Token:", authToken);
});

test("❌ Login fails with incorrect credentials", async ({ request }) => {
  console.log("🔄 Attempting login with incorrect credentials...");

  const response = await request.post("https://reqres.in/api/login", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: "elko.holt@reqres.in",  
      password: "wrongpassword123",
    },
  });

  console.log(`📡 Response Status: ${response.status()}`);
  expect(response.status()).toBe(400);  

  const jsonData = await response.json();
  console.log("🔍 Response Body:", jsonData);

  expect(jsonData).toHaveProperty("error");
  expect(jsonData.error).toBe("Missing password");  
});

test("❌ Create user fails with missing fields", async ({ request }) => {
  console.log("🔄 Attempting to create a user with missing fields...");

  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: "",  
    },
  });

  console.log(`📡 Response Status: ${response.status()}`);
  const jsonData = await response.json();
  console.log("🔍 Response Body:", jsonData);

   expect(response.status()).toBeGreaterThanOrEqual(400);

   expect(jsonData).toHaveProperty("error"); 
});

test("❌ Create user fails with invalid email format", async ({ request }) => {
  console.log("🔄 Attempting to create a user with an invalid email format...");

  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: "John Doe",
      email: "invalid-email-format", // Invalid email format (missing @ and domain)
      job: "Software Engineer",
    },
  });

  console.log(`📡 Response Status: ${response.status()}`);
  const jsonData = await response.json();
  console.log("🔍 Response Body:", jsonData);

   expect(response.status()).toBeGreaterThanOrEqual(400);

   expect(jsonData).toHaveProperty("error");  
});

test("❌ Fetch non-existent user returns 404", async ({ request }) => {
  console.log("🔄 Attempting to fetch a non-existent user...");

  const response = await request.get("https://reqres.in/api/users/99999"); 

  console.log(`📡 Response Status: ${response.status()}`);
  const jsonData = await response.json();
  console.log("🔍 Response Body:", jsonData);

   expect(response.status()).toBe(404);

   expect(jsonData).toEqual({});
});

test("❌ Update user fails with missing fields", async ({ request }) => {
  console.log("🔄 Attempting to update a user with missing fields...");

  const response = await request.put("https://reqres.in/api/users/2", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: "",  
    },
  });

  console.log(`📡 Response Status: ${response.status()}`);
  const jsonData = await response.json();
  console.log("🔍 Response Body:", jsonData);

   expect(response.status()).toBeGreaterThanOrEqual(400);

   expect(jsonData).toHaveProperty("error");  
});

test(
  "❌ Delete non-existent user returns appropriate response",
  async ({ request }) => {
    console.log("🔄 Attempting to delete a non-existent user...");

    const response = await request.delete("https://reqres.in/api/users/99999"); // Using a high ID that likely doesn’t exist

    console.log(`📡 Response Status: ${response.status()}`);

     expect([204, 404]).toContain(response.status());

     if (response.status() === 404) {
      const jsonData = await response.json();
      console.log("🔍 Response Body:", jsonData);
      expect(jsonData).toHaveProperty("error");
    }
  }
);

});


 
 