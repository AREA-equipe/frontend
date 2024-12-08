import React, { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DiscordNodeProps {
  data: {
    onDelete: () => void;
  };
  isConnectable: boolean;
}

const Discord: React.FC<DiscordNodeProps> = memo(({ data, isConnectable }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleDelete = () => {
    if (data.onDelete) {
      data.onDelete();
    }
    setIsConfirmingDelete(false);
    setIsOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div className="w-20 h-20 z-10 relative flex items-center justify-center px-4 py-2 border-2 border-black rounded-sm cursor-grab bg-white text-xs">
            <Handle
              type="target"
              position={Position.Left}
              onConnect={(params) => console.log('Handle onConnect:', params)}
              isConnectable={isConnectable}
            />
            <div className="text-2xl font-medium">
              <img
                src="/discord_logo.png"
                alt="Discord Logo"
                className="h-6 w-8"
              />
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id="a"
              isConnectable={isConnectable}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="b"
              isConnectable={isConnectable}
            />
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isConfirmingDelete ? 'Confirm Deletion' : 'This is a Discord modal!'}</DialogTitle>
            <DialogDescription>
              {isConfirmingDelete
                ? 'Are you sure you want to delete this node? This action cannot be undone.'
                : 'Manage your Discord Node settings here.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {isConfirmingDelete ? (
              <>
                <Button onClick={handleCancelDelete} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleDelete} type="button" variant="destructive">
                  Confirm Delete
                </Button>
              </>
            ) : (
              <Button onClick={handleDeleteClick} type="button" variant="destructive">
                Delete Node
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default Discord;
