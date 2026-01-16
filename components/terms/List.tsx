'use client';

import React, { memo } from 'react';

const List = memo(({ items }: { items: string[] }) => (
    <ul className="space-y-1.5 ml-4">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
                <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
));
List.displayName = 'List';

export default List;
