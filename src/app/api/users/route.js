import { query } from "@/lib/db";

export async function GET(request) {
  const user = await query({
    query: "SELECT * FROM users",
    values: [],
  });

  let data = JSON.stringify(user);
  return new Response(data, {
    status: 200,
  });
}

export async function POST(request) {
  try {
    const { id, name, password, email } = await request.json();
    const updateUsers = await query({
      query: "INSERT INTO users (id, name, password, email) VALUES (?, ?, ?, ?)",
      values: [name, password, email],
    });
    const result = updateUsers.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const user = {
      id: id,
      name: name,
      password: password,
      email: email
    };
    return new Response(JSON.stringify({
      message: message,
      status: 200,
      user: user
    }));
  } catch (error) {
    return new Response(JSON.stringify({
      status: 500,
      data: request
    }));
  }
}

export async function PUT(request) {
  try {
    const { id, name, password } = await request.json();
    const updateUsers = await query({
      query: "UPDATE users SET name = ?, password = ? WHERE id = ?",
      values: [name, password, id],
    });
    const result = updateUsers.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const user = {
      id: id,
      name: name,
      password: password
    };
    return new Response(JSON.stringify({
      message: message,
      status: 200,
      user: user
    }));
  } catch (error) {
    return new Response(JSON.stringify({
      status: 500,
      message: error.message
    }));
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const deleteUser = await query({
      query: "DELETE FROM users WHERE id = ?",
      values: [id],
    });
    const result = deleteUser.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const user = {
      id: id,
    };
    return new Response(JSON.stringify({
      message: message,
      status: 200,
      user: user
    }));
  } catch (error) {
    return new Response(JSON.stringify({
      status: 500,
      data: res
    }));
  }
}