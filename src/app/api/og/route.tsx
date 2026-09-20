import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city') ?? 'Sydney';
    const sqm = searchParams.get('sqm') ?? '1.55';
    const deposit = searchParams.get('deposit') ?? '50,000';
    const currency = searchParams.get('currency') ?? 'AUD';
    const punchline =
      searchParams.get('punchline') ??
      "Congratulations. That's almost a hallway.";
    const metaphor = searchParams.get('metaphor') ?? 'A single yoga mat';
    const toast = searchParams.get('toast') ?? '2,272 toasts';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#F8F6F0',
            padding: '48px',
            border: '16px solid #141414',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '4px solid #141414',
              paddingBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  backgroundColor: '#FFE600',
                  color: '#141414',
                  fontWeight: 900,
                  fontSize: '28px',
                  padding: '8px 16px',
                  border: '3px solid #141414',
                  boxShadow: '4px 4px 0px #141414',
                  letterSpacing: '2px',
                }}
              >
                $0SQM
              </div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#141414',
                  letterSpacing: '1px',
                }}
              >
                OFFICIAL HOUSING REALITY CHECK™
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#141414',
                color: '#FFE600',
                padding: '6px 14px',
                fontSize: '16px',
                fontWeight: 800,
                letterSpacing: '1px',
              }}
            >
              CERTIFIED RESULT
            </div>
          </div>

          {/* Main Calculation Roast Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              margin: '20px 0',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#666666',
                letterSpacing: '2px',
              }}
            >
              WITH A DEPOSIT OF {currency} {deposit}, YOU CAN AFFORD:
            </div>

            {/* Huge SQM Number Display */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '24px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFE600',
                  color: '#141414',
                  fontSize: '96px',
                  fontWeight: 900,
                  padding: '0 32px',
                  border: '6px solid #141414',
                  boxShadow: '8px 8px 0px #141414',
                  lineHeight: '1.1',
                }}
              >
                {sqm} m²
              </div>
              <div
                style={{
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#141414',
                  textTransform: 'uppercase',
                }}
              >
                OF {city}
              </div>
            </div>

            {/* Roast Punchline */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '3px solid #141414',
                padding: '16px 24px',
                boxShadow: '4px 4px 0px #141414',
                fontSize: '22px',
                fontWeight: 700,
                color: '#141414',
                fontStyle: 'italic',
                maxWidth: '900px',
              }}
            >
              &ldquo;{punchline}&rdquo;
            </div>
          </div>

          {/* Breakdown / Culture Index Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '4px solid #141414',
              paddingTop: '20px',
            }}
          >
            <div style={{ display: 'flex', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#666666',
                    letterSpacing: '1px',
                  }}
                >
                  SPATIAL REALITY
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#141414',
                  }}
                >
                  {metaphor}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#666666',
                    letterSpacing: '1px',
                  }}
                >
                  LOCAL CURRENCY EQUIVALENT
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#141414',
                  }}
                >
                  {toast}
                </span>
              </div>
            </div>

            {/* Stamp Box */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '4px dashed #141414',
                padding: '8px 20px',
                transform: 'rotate(-2deg)',
                backgroundColor: '#FFF176',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  color: '#141414',
                }}
              >
                CFO CORGI APPROVED
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  color: '#D32F2F',
                }}
              >
                0% HOPE / 100% STYLE
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#141414',
                }}
              >
                0sqm.club
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Failed to generate image';
    return new Response(`OG generation error: ${errorMsg}`, { status: 500 });
  }
}
