import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedUsers1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt(10);

    const users = [
      {
        username: 'superadmin',
        password: await bcrypt.hash('superpassword', salt),
        role: 'super_admin',
      },
      {
        username: 'admin',
        password: await bcrypt.hash('adminpassword', salt),
        role: 'admin',
      },
      {
        username: 'press',
        password: await bcrypt.hash('presspassword', salt),
        role: 'press',
      },
    ];

    for (const user of users) {
      await queryRunner.query(
        `INSERT INTO users (username, password, role) VALUES ('${user.username}', '${user.password}', '${user.role}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE username IN ('superadmin', 'admin', 'press')`);
  }
}
