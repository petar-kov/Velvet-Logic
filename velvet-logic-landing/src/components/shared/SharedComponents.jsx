import React from 'react';
import * as LucideIcons from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../../sanity';
import imageUrlBuilder from '@sanity/image-url';

export const DynamicIcon = ({ name, customIcon, ...props }) => {
  if (customIcon && customIcon.asset) {
    return <img src={urlFor(customIcon).url()} alt="" style={{ width: props.size || 20, height: props.size || 20 }} className={props.className} />
  }
  const Icon = LucideIcons[name] || LucideIcons.ArrowRight;
  return <Icon {...props} />;
};

export const RichText = ({ content, className = '' }) => {
  if (!content) return null;
  
  // Extract localized content if it's an object with an 'en' property
  const parsedContent = (content && typeof content === 'object' && content.en) 
    ? content.en 
    : content;

  if (typeof parsedContent === 'string') return <>{parsedContent}</>;

  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;
        return (
          <img
            alt={value.alt || 'Content image'}
            loading="lazy"
            src={client ? imageUrlBuilder(client).image(value).width(800).auto('format').url() : ''}
            className="w-full rounded-xl my-6 border border-gray/20 shadow-md object-cover"
          />
        );
      }
    }
  };

  return (
    <div className={`[&>p]:mb-4 last:[&>p]:mb-0 ${className}`}>
      <PortableText value={parsedContent} components={ptComponents} />
    </div>
  );
};

export const DynamicHeading = ({ tag = 'h2', children, ...props }) => {
  const Tag = tag;
  return <Tag {...props}>{children}</Tag>;
};

// Helper for localized fields
export const l = (field) => field && typeof field === 'object' ? field.en || '' : (field || '');
