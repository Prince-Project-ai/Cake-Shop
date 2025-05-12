import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

// Using the same theme for consistency
const theme = {
    fontHeading: "Poppins, sans-serif",
    fontBody: "Inter, sans-serif",
    fontButton: "Montserrat, sans-serif",
    colorPrimaryDark: "#222222",
    colorLight: "#eeeeee",
    colorAccent: "#ff6f61"
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Footer sections
    const linkSections = [
        {
            title: "Shop",
            links: [
                { title: "All Products", url: "#" },
                { title: "Wedding Cakes", url: "#" },
                { title: "Birthday Cakes", url: "#" },
                { title: "Custom Orders", url: "#" },
                { title: "Seasonal Specials", url: "#" }
            ]
        },
        {
            title: "Information",
            links: [
                { title: "About Us", url: "#" },
                { title: "Our Bakers", url: "#" },
                { title: "Delivery Areas", url: "#" },
                { title: "Testimonials", url: "#" },
                { title: "Baking Classes", url: "#" }
            ]
        },
        {
            title: "Customer Service",
            links: [
                { title: "Contact Us", url: "#" },
                { title: "FAQs", url: "#" },
                { title: "Shipping Policy", url: "#" },
                { title: "Returns & Refunds", url: "#" },
                { title: "Order Tracking", url: "#" }
            ]
        }
    ];

    // Social media links
    const socialLinks = [
        { icon: Instagram, label: "Instagram" },
        { icon: Facebook, label: "Facebook" },
        { icon: Twitter, label: "Twitter" }
    ];

    // Contact information
    const contactInfo = [
        {
            icon: MapPin,
            text: "123 Baker Street, Sweet City, SC 10001",
            url: "https://maps.google.com"
        },
        {
            icon: Phone,
            text: "(555) 123-4567",
            url: "tel:+15551234567"
        },
        {
            icon: Mail,
            text: "info@sweetcakes.com",
            url: "mailto:info@sweetcakes.com"
        }
    ];

    return (
        <footer style={{ backgroundColor: theme.colorPrimaryDark, color: theme.colorLight }}>
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company info and newsletter */}
                    <div>
                        <h3
                            className="text-lg font-semibold mb-6"
                            style={{ fontFamily: theme.fontHeading }}
                        >
                            Sweet Cakes
                        </h3>
                        <p
                            className="text-sm mb-6 opacity-80"
                            style={{ fontFamily: theme.fontBody }}
                        >
                            Handcrafted artisanal cakes made with the finest ingredients for every special occasion.
                        </p>

                        {/* Newsletter sign-up */}
                        <h4
                            className="text-sm font-medium mb-3"
                            style={{ fontFamily: theme.fontHeading }}
                        >
                            Subscribe to our newsletter
                        </h4>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-3 py-2 text-sm rounded-l"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    color: 'white',
                                    fontFamily: theme.fontBody
                                }}
                            />
                            <button
                                className="px-4 py-2 rounded-r text-sm font-medium"
                                style={{
                                    backgroundColor: theme.colorAccent,
                                    color: 'white',
                                    fontFamily: theme.fontButton
                                }}
                            >
                                Join
                            </button>
                        </div>
                    </div>

                    {/* Footer link columns */}
                    {linkSections.map((section) => (
                        <div key={section.title}>
                            <h3
                                className="text-lg font-semibold mb-6"
                                style={{ fontFamily: theme.fontHeading }}
                            >
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.url}
                                            className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200 hover:underline"
                                            style={{ fontFamily: theme.fontBody }}
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact and social section */}
                <div className="mt-12 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact information */}
                    <div>
                        <h3
                            className="text-lg font-semibold mb-6"
                            style={{ fontFamily: theme.fontHeading }}
                        >
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <item.icon size={18} className="mr-3 mt-1 opacity-80" />
                                    <a
                                        href={item.url}
                                        className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                                        style={{ fontFamily: theme.fontBody }}
                                        target={item.url.startsWith('http') ? "_blank" : ""}
                                        rel={item.url.startsWith('http') ? "noopener noreferrer" : ""}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social links and payment methods */}
                    <div className="flex flex-col">
                        <div>
                            <h3
                                className="text-lg font-semibold mb-6"
                                style={{ fontFamily: theme.fontHeading }}
                            >
                                Follow Us
                            </h3>
                            <div className="flex space-x-4 mb-8">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href="#"
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: theme.colorLight,
                                        }}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Payment methods */}
                        <div>
                            <h3
                                className="text-lg font-semibold mb-4"
                                style={{ fontFamily: theme.fontHeading }}
                            >
                                We Accept
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['visa', 'mastercard', 'amex', 'paypal'].map((method) => (
                                    <div
                                        key={method}
                                        className="w-12 h-8 rounded bg-white flex items-center justify-center"
                                    >
                                        <div className="text-xs font-semibold text-gray-800">{method}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright bar */}
            <div
                className="py-4 text-center text-sm"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    fontFamily: theme.fontBody
                }}
            >
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p>© {currentYear} Sweet Cakes. All rights reserved.</p>
                    <div className="mt-2 md:mt-0">
                        <a href="#" className="opacity-80 hover:opacity-100 transition-opacity duration-200 mr-4">Privacy Policy</a>
                        <a href="#" className="opacity-80 hover:opacity-100 transition-opacity duration-200 mr-4">Terms of Service</a>
                        <a href="#" className="opacity-80 hover:opacity-100 transition-opacity duration-200">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}