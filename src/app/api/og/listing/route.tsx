import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function getBandDetails(scoreNum: number, labelFromParam?: string | null) {
  if (labelFromParam && labelFromParam.trim()) {
    const l = labelFromParam.trim().toLowerCase();
    if (l.includes('rare')) {
      return {
        label: 'RARE W',
        bg: '#D1FADF',
        border: '#12B76A',
        text: '#027A48',
        punchline: 'Unusually strong value for Sydney. Double-check for structural mold or hidden 6am jackhammers.',
      };
    }
    if (l.includes('reasonable')) {
      return {
        label: 'SURPRISINGLY REASONABLE',
        bg: '#FEF08A',
        border: '#EAB308',
        text: '#854D0E',
        punchline: 'A solid listing by Sydney standards. You might actually afford coffee after paying rent.',
      };
    }
    if (l.includes('shoebox')) {
      return {
        label: 'OVERPRICED SHOEBOX',
        bg: '#FFEDD5',
        border: '#F97316',
        text: '#9A3412',
        punchline: 'Your landlord is clearly funding their European yacht lease with this exact weekly rent.',
      };
    }
    if (l.includes('damage')) {
      return {
        label: 'EMOTIONAL DAMAGE',
        bg: '#FEE4E2',
        border: '#F04438',
        text: '#B42318',
        punchline: 'Catastrophic rent burden. Landlord wants your blood type, Netflix login, and firstborn soul.',
      };
    }
  }

  if (scoreNum >= 80) {
    return {
      label: 'RARE W',
      bg: '#D1FADF',
      border: '#12B76A',
      text: '#027A48',
      punchline: 'Unusually strong value for Sydney. Double-check for structural mold or hidden 6am jackhammers.',
    };
  }
  if (scoreNum >= 65) {
    return {
      label: 'SURPRISINGLY REASONABLE',
      bg: '#FEF08A',
      border: '#EAB308',
      text: '#854D0E',
      punchline: 'A solid listing by Sydney standards. You might actually afford coffee after paying rent.',
    };
  }
  if (scoreNum >= 45) {
    return {
      label: 'MARKET REALITY',
      bg: '#E2E8F0',
      border: '#64748B',
      text: '#334155',
      punchline: 'Pure Sydney equilibrium: aggressive bond, painful weekly bite, zero room for sudden emergencies.',
    };
  }
  if (scoreNum >= 25) {
    return {
      label: 'OVERPRICED SHOEBOX',
      bg: '#FFEDD5',
      border: '#F97316',
      text: '#9A3412',
      punchline: 'Your landlord is clearly funding their European yacht lease with this exact weekly rent.',
    };
  }
  return {
    label: 'EMOTIONAL DAMAGE',
    bg: '#FEE4E2',
    border: '#F04438',
    text: '#B42318',
    punchline: 'Catastrophic rent burden. Landlord wants your blood type, Netflix login, and firstborn soul.',
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const suburb = searchParams.get('suburb') || 'Surry Hills';
    const rent = searchParams.get('rent') || '700';
    const scoreStr = searchParams.get('score') || '83';
    const scoreNum = Math.max(0, Math.min(100, parseInt(scoreStr, 10) || 50));
    const labelParam = searchParams.get('label');
    const prem = searchParams.get('prem') || '-2.8% vs local';
    const beds = searchParams.get('beds') || '1';
    const burden = searchParams.get('burden') || '29.8%';
    const upfrontNum = Number(rent) * 6;
    const upfront = searchParams.get('upfront') || `$${upfrontNum.toLocaleString()}`;

    const band = getBandDetails(scoreNum, labelParam);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FAF9F5',
            padding: '36px 44px',
            fontFamily: 'sans-serif',
            justifyContent: 'space-between',
            border: '10px solid #141414',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingBottom: '16px',
              borderBottom: '3px solid #141414',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#141414',
                  letterSpacing: '-0.03em',
                }}
              >
                <span style={{ display: 'flex' }}>$</span>
                <span
                  style={{
                    display: 'flex',
                    backgroundColor: '#141414',
                    color: '#FFE600',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginLeft: '2px',
                    marginRight: '4px',
                  }}
                >
                  0
                </span>
                <span style={{ display: 'flex' }}>SQM</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '16px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#666666',
                  textTransform: 'uppercase',
                  marginLeft: '8px',
                }}
              >
                LISTING REALITY CHECK
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFE600',
                border: '2px solid #141414',
                padding: '6px 14px',
                borderRadius: '3px',
                fontWeight: 900,
                fontSize: '14px',
                letterSpacing: '0.08em',
                color: '#141414',
              }}
            >
              NSW RENTALS
            </div>
          </div>

          {/* Suburb & Price Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
              marginTop: '12px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#141414',
                  letterSpacing: '-0.02em',
                }}
              >
                {suburb}, NSW
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '20px',
                  color: '#666666',
                  fontWeight: 600,
                  marginTop: '4px',
                }}
              >
                {beds} Bedroom apartment
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: '52px',
                  fontWeight: 900,
                  color: '#141414',
                  letterSpacing: '-0.03em',
                }}
              >
                ${rent}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '18px',
                  color: '#777777',
                  fontWeight: 700,
                  marginTop: '-2px',
                }}
              >
                / week
              </div>
            </div>
          </div>

          {/* Score Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              border: '3px solid #141414',
              padding: '18px 24px',
              borderRadius: '6px',
              marginTop: '12px',
              boxShadow: '4px 4px 0px #141414',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#666666',
                  textTransform: 'uppercase',
                }}
              >
                0SQM REALITY SCORE
              </div>

              <div
                style={{
                  display: 'flex',
                  backgroundColor: band.bg,
                  border: `2px solid ${band.border}`,
                  color: band.text,
                  fontWeight: 900,
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {band.label}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  fontSize: '64px',
                  fontWeight: 900,
                  color: '#141414',
                  lineHeight: '1',
                }}
              >
                {scoreNum}
              </span>
              <span
                style={{
                  display: 'flex',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#999999',
                  marginLeft: '8px',
                }}
              >
                / 100
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                borderTop: '1px solid #E5E5E5',
                paddingTop: '8px',
                fontSize: '15px',
                fontStyle: 'italic',
                color: '#444444',
                lineHeight: '1.3',
              }}
            >
              &ldquo;{band.punchline}&rdquo;
            </div>
          </div>

          {/* Key Metrics Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #141414',
              borderRadius: '4px',
              padding: '12px 20px',
              marginTop: '12px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: '12px', fontWeight: 800, color: '#777777', textTransform: 'uppercase' }}>
                LOCAL COMPARISON
              </div>
              <div style={{ display: 'flex', fontSize: '18px', fontWeight: 900, color: prem.includes('-') ? '#027A48' : '#B42318' }}>
                {prem}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: '12px', fontWeight: 800, color: '#777777', textTransform: 'uppercase' }}>
                RENT BURDEN
              </div>
              <div style={{ display: 'flex', fontSize: '18px', fontWeight: 900, color: '#141414' }}>
                {burden} of income
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: '12px', fontWeight: 800, color: '#777777', textTransform: 'uppercase' }}>
                UPFRONT CASH (NSW)
              </div>
              <div style={{ display: 'flex', fontSize: '18px', fontWeight: 900, color: '#141414' }}>
                {upfront} (4w+2w)
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingTop: '10px',
              fontSize: '13px',
              color: '#777777',
              fontWeight: 600,
            }}
          >
            <div style={{ display: 'flex' }}>ABS 2021 Census &bull; 0sqm.com</div>
            <div style={{ display: 'flex' }}>Not financial advice. Just reality.</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err: unknown) {
    console.error('OG generation failed:', err);
    return new Response('Failed to generate image', { status: 500 });
  }
}
