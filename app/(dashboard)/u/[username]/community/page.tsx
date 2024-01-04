import React from 'react';
import { columns } from './_components/Columns';
import { DataTable } from './_components/DataTable';
import { format } from 'date-fns';
import { getBlockedUsers } from '@/lib/block.service';

const CommunityPage = async () => {
  const data = await getBlockedUsers();

  const formattedData = data.map((block) => ({
    ...block,
    userId: block.blocked.id,
    username: block.blocked.username,
    image: block.blocked.image,
    createdAt: format(new Date(block.blocked.updatedAt), 'dd/MM/yyyy'),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
