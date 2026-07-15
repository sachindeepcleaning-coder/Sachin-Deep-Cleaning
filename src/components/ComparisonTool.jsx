import { useState } from 'react';

const DATA = [
  { bhk: '1 BHK', time: '3 hr', price: '₹2,499' },
  { bhk: '2 BHK', time: '4 hr', price: '₹3,499' },
  { bhk: '3 BHK', time: '5 hr', price: '₹4,499' },
  { bhk: '4 BHK', time: '6 hr', price: '₹5,499' },
  { bhk: '5 BHK', time: '7 hr', price: '₹6,499' },
];

// Interactive service comparison + live price quote.
export default function ComparisonTool() {
  const [sel, setSel] = useState('all');
  const rows = sel === 'all' ? DATA : DATA.filter((r) => r.bhk === sel);
  const total = sel === 'all' ? null : DATA.find((r) => r.bhk === sel)?.price;

  return (
    <div>
      <div className="compare-controls">
        <select aria-label="Filter by home size" value={sel} onChange={(e) => setSel(e.target.value)}>
          <option value="all">All Home Sizes</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={`${n} BHK`}>{n} BHK</option>
          ))}
        </select>
      </div>
      <table className="compare-table">
        <thead>
          <tr>
            <th>Home</th>
            <th>Time</th>
            <th>Price</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.bhk}>
              <td>{r.bhk} Clean</td>
              <td>{r.time}</td>
              <td>{r.price}</td>
              <td>
                <a className="btn btn-secondary" href="contact.html" style={{ padding: '6px 14px', fontSize: 13 }}>
                  Book
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {total && (
        <div className="quote-box">
          <p className="text-muted">Your estimate</p>
          <div className="quote-price">{total}</div>
        </div>
      )}
    </div>
  );
}
