import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Необходимо указать email и пароль" },
        { status: 400 }
      );
    }

    // Проверяем, существует ли пользователь с таким email
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 400 }
      );
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Неверный пароль" },
        { status: 400 }
      );
    }

    // Удаляем пароль из ответа
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword, message: "Успешный вход" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
} 