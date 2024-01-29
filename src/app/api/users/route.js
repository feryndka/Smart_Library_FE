import { query } from "../../../lib/db";

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
    const { name, telp, password, email, alamat, type } = await request.json();
    const updateUsers = await query({
      query: "INSERT INTO users (name, telp, password, email, alamat, type) VALUES (?, ?, ?, ?, ?, ?)",
      values: [name, telp, password, email, alamat, type],
    });
    const result = updateUsers.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const user = {
      name: name,
      telp: telp,
      password: password,
      email: email,
      alamat: alamat,
      type: type
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
    const { id, name, telp, password, email, alamat } = await request.json();
    const updateUsers = await query({
      query: "UPDATE users SET name = ?, telp = ?, password = ?, email = ?, alamat = ? WHERE id = ?",
      values: [name, telp, password, email, alamat, id],
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
      telp: telp,
      password: password,
      email: email,
      alamat: alamat
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