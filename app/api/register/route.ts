import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Простая функция логирования в файл
function logToFile(message: string) {
  try {
    fs.appendFileSync(path.join(process.cwd(), 'debug.log'), `${new Date().toISOString()}: ${message}\n`);
  } catch (error) {
    console.error('Ошибка при записи в лог-файл:', error);
  }
}

export async function POST(request: Request) {
  try {
    logToFile('Получен POST запрос на /api/register');
    
    const body = await request.json();
    const { name, email, password } = body;
    
    logToFile(`Данные запроса: name=${name}, email=${email}, password=****`);

    if (!name || !email || !password) {
      logToFile('Ошибка: Отсутствуют обязательные поля');
      return NextResponse.json(
        { message: "Необходимо указать имя, email и пароль" },
        { status: 400 }
      );
    }

    // Проверяем, существует ли пользователь с таким email
    logToFile('Проверка существования пользователя');
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      logToFile(`Пользователь с email ${email} уже существует`);
      return NextResponse.json(
        { message: "Пользователь с таким email уже существует" },
        { status: 400 }
      );
    }

    // Хешируем пароль
    logToFile('Хеширование пароля');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    logToFile('Создание пользователя в БД');
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        }
      });

      // Удаляем пароль из ответа
      const { password: _, ...userWithoutPassword } = user;
      
      logToFile(`Пользователь успешно создан: ${JSON.stringify(userWithoutPassword)}`);
      
      return NextResponse.json(
        { user: userWithoutPassword, message: "Пользователь успешно зарегистрирован" },
        { status: 201 }
      );
    } catch (dbError) {
      logToFile(`Ошибка при создании пользователя в БД: ${JSON.stringify(dbError)}`);
      throw dbError;
    }
  } catch (error) {
    logToFile(`Общая ошибка: ${error}`);
    console.error("Ошибка при регистрации:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
} 